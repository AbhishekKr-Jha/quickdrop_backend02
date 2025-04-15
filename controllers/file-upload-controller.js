
import { PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'




 
export const upload_url_generator=async (req,res)=>{
    const {userEmail,fileName,fileType,contentType}=req.body

const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY ,
        secretAccessKey:process.env.AWS_SECRET_KEY
   
    }
})

    const command=new PutObjectCommand({
        Bucket:'bucketquickdrop',
        Key:`/${userEmail}/${fileType}/${fileName}`,
        ContentType:contentType
    })
    console.log(" the console is ",process.env.AWS_ACCESS_KEY)

    try {     
        const url=await getSignedUrl(s3Client,command)
        // console.log("thye url value is",url)
res.status(200).json({
    success:true,
    presigned_url:url,
    message:"Presigned url generated Successfully!"
})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        }) 
    }

}