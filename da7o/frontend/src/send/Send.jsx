import axios from 'axios'
import React, { useState } from 'react'
import {RotatingLines} from 'react-loader-spinner'
export default function Send() {
    const [file , setFile] = useState(null)
    const [files , setFiles] = useState(null)
    const [data , setData] = useState('')
    const [title , setTitle] = useState('')
    const [text , setText] = useState('')
    const [load , setLoad] = useState(false)
    console.log('hhhhhhhhh',file);
    console.log('ggggggggg',files);
    const formdata = new FormData()
    formdata.append('files',file)
    if(files){
    for(let i =0 ; i < files.length ; i++ ){
        formdata.append('files',files[i])
    }}
    formdata.append('title' ,title )
    formdata.append('text' ,text )
    const submit = async()=>{
        let res = await axios.post('http://localhost:8000/', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setData(res.data.message)
          
    }

   

    console.log(data.message);
    return (
    <div className=' w-full h-screen flex justify-center items-center  '>
        
        <div className=' p-3 rounded-md flex flex-col justify-center items-center h-[400px] bg-slate-300 shadow-lg'>
        <div className=' text-black font-semibold text-xl uppercase'>Send Email</div>
            <input type="text" className=' w-full mb-2 outline-none' onChange={(e)=>setTitle(e.target.value)}  />
            
            <textarea type="text" className=' w-full h-40 mb-2 outline-none' onChange={(e)=>setText(e.target.value)} />

            <input type="file" className=' my-1'  onChange={(e)=>setFile(e.target.files[0])} />
            <input type="file" className=' my-1' multiple onChange={(e)=>setFiles(e.target.files)}  />
           
            {load ? ( data ?
                <div className=' text-xl font-semibold text-black' >send seccuss</div>:
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
            ):''}
            {file &&
        
            <button className=' bg-green-500 text-white rounded-md p-1 w-full' onClick={()=>{submit()
                setLoad(true) 
                setData('')}} 
                
                >Send</button>
                
            }
        </div>
    </div>
  )
}
