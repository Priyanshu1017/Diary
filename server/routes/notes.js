const express = require('express')
const router = express.Router();
const fetchuser=require('../middleware/fetchuser');
const Notes=require('../models/Notes')
const {body,validationResult}=require('express-validator'); 

//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const notes=await Notes.find({user:req.user.id});
        // console.log(notes);
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
)

        
//Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('desription','Enter a valid description').isLength({min:5})
], async(req,res)=>{
    const {title,description,tag}=req.body;

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        try{
            const note=new Notes({
                title,description,tag,user:req.user.id
            })
            const savedNote = await note.save();
            res.status(200).json(savedNote)
        }catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
//Route 3 : Update an existing note using: PUT "/api/notes/updatenote". Login required
 router.put('/updatenote/:id',fetchuser,async(req,res)=>{
        const {title,description,tag}=req.body;
        try{
            const newNote={};
            if(title){newNote.title=title};
            if(description){newNote.description=description};
            if(tag){newNote.tag=tag};
            //find the note to be updated and update it
            let note=await Notes.findById(req.params.id);
            if(!note){return res.status(404).send("Not found")};
    
            if(note.user.toString()!==req.user.id){
                return res.status(401).send("Not allowed");
            }
            note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
            res.status(200).send(note);  
        }catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
)
//Route 4 : Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        //find the note to be deleted and delete it
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")};

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
)


module.exports=router;