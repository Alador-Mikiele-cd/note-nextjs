import connectDB from "@/lib/db";
import Note from '@/lib/models/note'
export async function POST(req:Request) {
    try{
      await connectDB()
      const{ title , note} = await req.json()
      const newNote = await Note.create({title, note})
      return Response.json({newNote} , {status : 201})

    }catch(err:any){
        return Response.json({err : err.message} , {status : 500})
    }
    
}

export async function GET(req:Request) {
    try{
        await connectDB()
        const Notes = await Note.find()
        return Response.json(Notes , {status : 200})
    }catch(err:any){
        return Response.json({err : err.message} , {status : 500})
    }
    
}