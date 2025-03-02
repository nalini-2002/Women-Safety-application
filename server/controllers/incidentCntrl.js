const asyncHandler = require('express-async-handler');
const { Incident } = require('../models/incidentRptModel');
const { User } = require('../models/userModel')

const fs = require('fs');
const path = require('path')

const { log } = require('console');
require('dotenv').config();


const addIncident = asyncHandler(async (req, res) => {

    const { user, report, pincodeOfIncident, mimeType, address } = req.body;
    // const note= req.file.path

    
    if(true){
        // const params = {
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Key: note,
        //     Body: fs.createReadStream(req.file.path),
        //     ContentType: mimeType
        // }
        // const s3Response = await s3.upload(params).promise();
        // const incFile = s3Response.Location;
       

        const incident = await Incident.create({
            user,
            report,
            pincodeOfIncident,
            address,
            // meidaSt: incFile
        })



        if(incident){
            res.status(201).json({message: "Incident reported successfully"})
        }else{
            res.status(500).json({message: "Something went wrong"})
        }
    }else{
        const incident = await Incident.create({
            user,
            report,
            address,
            pincodeOfIncident
        })

        if(incident){
            res.status(201).json({message: "Incident reported successfully"})
        }else{
            res.status(500).json({message: "Something went wrong"})
        }
    }

});


const getAllIncidents = asyncHandler(async(req,res) => {

    console.log("get all incidents");
    

    const incidents = await Incident.find({});
    const data = []
    for(const x of incidents){
        const user = await User.findById(x.user);
     
        if(user){
            data.push({
                _id: x._id,
                uname: user.uname,
                address: x.address,
                pincode: x.pincodeOfIncident,
                report: x.report,
                isSeen: x.isSeen,
                image: x.meidaSt || "empty",
                createdAt: x.createdAt,
                updatedAt: x.updatedAt
            })
        }
        
    }
    res.status(200).json(data)
});

const acknowledgeInc = asyncHandler(async(req,res) => {

    const inc = req.params.id;
    console.log(inc,"ack")               ;
    
    const incident = await Incident.findById(inc);
    console.log(incident)
    if(incident){
        incident.isSeen = true;
        await incident.save()
    }
})

module.exports = {addIncident ,getAllIncidents,acknowledgeInc}