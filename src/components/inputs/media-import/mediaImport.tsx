import React from 'react'
import { useRef, useState } from 'react'
import { MbIcon } from '../..'
import { EIconName } from '../../..'
import { EMediaType, VALID_FILE_FORMATS } from '../../../consts/fileFormats'
import { isMobile } from '../../../consts/mobile'

import AcceptedFormats from './acceptedFormats'

interface MediaImportProps {
  isProfileImage: boolean
  acceptedFormats: EMediaType
  idealDimensions: string
  maxSize: number
  handleUpload: (file: File) => void
}

const preventBrowserDefaults = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
}

const MbMediaImport = (props: MediaImportProps) => {
  const {
    isProfileImage,
    acceptedFormats,
    idealDimensions,
    maxSize,
    handleUpload,
  } = props
  const [imageUrl, setImageUrl] = useState<any>('')
  const [errorMessage, setErrorMessage] = useState('')

  const dragRef = useRef(0)
  const [dragOverlay, setDragOverlay] = useState(false)

  const handleDrag = (event: any) => {
    preventBrowserDefaults(event)
  }

  const handleDragIn = (event: any) => {
    preventBrowserDefaults(event)
    dragRef.current++
    setDragOverlay(true)
  }

  const handleDragOut = async (event: any) => {
    preventBrowserDefaults(event)
    dragRef.current--
    if (dragRef.current === 0) {
      setDragOverlay(false)
    }
  }

  const handleDrop = async (event: any) => {
    preventBrowserDefaults(event)
    setDragOverlay(false)

    dragRef.current = 0

    if (!event.dataTransfer.files.length) {
      return
    }
    uploadImage(event.dataTransfer.files[0])
  }

  const uploadImage = (file: File) => {
    const size = file.size

    if (VALID_FILE_FORMATS[acceptedFormats].includes(file.type)) {
      if (size / 1024 / 1024 <= maxSize) {
        setErrorMessage('')
        setImageUrl(URL.createObjectURL(file))
        handleUpload(file)
      } else {
        setErrorMessage(`This file exceeds ${maxSize}mb`)
      }
    } else {
      setErrorMessage('This media type is not accepted')
    }
  }

  const handleImageChange = (e: any) => {
    if (!(e?.target?.files.length > 0)) return
    const file = e.target.files[0]

    uploadImage(file)
  }
  return (
    <>
      {imageUrl && (
        <>
          <div className="pb-12">
            <div
              className={`flex items-center justify-center w-full rounded-lg bg-gray-100 dark:bg-gray-900 w-full ${
                isProfileImage ? 'py-24' : 'overflow-hidden'
              }`}
            >
              <div
                className={` ${
                  isProfileImage
                    ? 'w-24 h-24 sm:h-32 sm:w-32 rounded-full overflow-hidden'
                    : 'h-32 sm:h-48 w-full'
                }`}
              >
                <img className="w-full h-full object-cover" src={imageUrl} />
              </div>
            </div>
          </div>

          <label className="block sm:hidden text-blue-300 dark:text-blue-100 p-med-90 text-center">
            Change Image
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </>
      )}
      <div className={`${imageUrl && isMobile() ? 'hidden' : ''}`}>
        <div className="flex items-center justify-center w-full">
          <label
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`flex flex-col rounded-lg ${
              dragOverlay
                ? 'bg-gray-100 dark:bg-gray-900'
                : 'bg-blue-300-15 dark:bg-blue-100-15'
            } w-full py-32 sm:py-48 group text-center cursor-pointer ${
              errorMessage ? 'ring-1 ring-error-300 dark:ring-error-100' : ''
            }`}
          >
            <div className="h-full w-full text-center flex flex-col items-center justify-center p-med-90">
              <p className="text-blue-300 dark:text-blue-100">Upload File</p>
              <p className="text-gray-600 dark:text-gray-300 hidden sm:block">
                (or just drop your file here)
              </p>
            </div>
            {errorMessage && (
              <div className="flex justify-center items-center pt-16">
                <p className="text-error-300 dark:text-error-100 cap-big-90 pr-12">
                  {errorMessage}
                </p>
                <MbIcon
                  name={EIconName.ERROR}
                  size="20px"
                  color="error-300 "
                  darkColor="error-100"
                />
              </div>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <AcceptedFormats
          acceptedFormats={VALID_FILE_FORMATS[acceptedFormats]}
          idealDimensions={idealDimensions}
          maxSize={maxSize}
        />
      </div>
    </>
  )
}

export default MbMediaImport
