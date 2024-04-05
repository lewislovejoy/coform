import React, {useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from "axios";
import {toast} from "react-toastify";
import {Button, Flex} from "@radix-ui/themes";
import { UploadIcon } from '@radix-ui/react-icons'

import FileBox, {FileDef} from "@/components/fileBox";
import {getUser} from "@/utils/user";

export default function FileManager() {
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<FileDef[]>([])

  useEffect(() => {
    async function getFiles() {
      const fileList = await axios.get(`http://localhost:3001/getFiles?userId=${getUser()}`)
      setFiles(fileList?.data?.map((file: any) => ({
        status: 'Loaded',
        ...file
      })))
    }
    getFiles().then(() => {})
  }, [])

  const processUpload = async () => {
    setIsUploading(true);
    const newFiles = files?.map((file) => ({
      ...file,
      status: file.status === 'Added' ? 'Processing' : file.status
    }))
    setFiles(newFiles)

    for(let i= 0; i < newFiles.length; i++) {
      const newFile = newFiles[i];
      if (newFile.status === 'Processing') {
        const formData = new FormData();
        formData.append('file', newFile.file as File);
        try {
          await axios({
            method: 'post',
            url: `http://localhost:3001/addFile?userId=${getUser()}&filename=${newFile.filename}&fileType=${newFile.fileType}`,
            timeout: 6000, // only wait for 6s
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
          })

          newFile.status = 'Loaded'
          setFiles([...newFiles])
        } catch (ex) {
          newFile.status = 'Error'
          setFiles([...newFiles])
        }
      }
    }
    setIsUploading(false);
  }

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length + files.length > 5) {
      toast.error('Sorry, you\'re only allowed up to 5 files');
      return;
    }

    let isValid = true;
    acceptedFiles.forEach((file) => {
      if (file.type !== 'application/pdf' && file.type !== 'text/plain') {
        isValid = false;
      }
    })

    if (!isValid) {
      toast.error('Sorry, we only support PDF and TEXT files');
      return;
    }

    const newFiles: FileDef[] = acceptedFiles.map((file) => {
      return {
        file: file,
        filename: file.name,
        fileType: file.type === 'application/pdf' ? 'PDF' : 'TXT',
        status: 'Added'
      }
    })

    setFiles((oldFiles) => { return [...oldFiles, ...newFiles] })
  }
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="max-w-xl">
          <label
            className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <Flex align="center" gap="1" direction="column">
              <div className="pt-5">
                <UploadIcon width={30} height={30}/>
              </div>
              <div className="font-bold">
                  Click to upload or drag and drop
              </div>
              <div className="font-medium font-weight text-gray-600">
                Only .pdf and .txt files are allowed
              </div>
            </Flex>
            <input type="file" name="file_upload" className="hidden" />
          </label>
        </div>
      </div>

      <div className="mt-5">
        {files.map((file) => (
          <FileBox key={file.filename} file={file}/>
        ))}
      </div>

      <Button
        size="3"
        className="w-full mt-5"
        style={{ backgroundColor: '#793dfe' }}
        onClick={processUpload}
        disabled={isUploading}
      >
        Upload
      </Button>
    </div>
  )
}
