import { useState } from 'react'

interface UseImageUploadReturn {
  image: string | null
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetImage: () => void
}

export function useImageUpload(): UseImageUploadReturn {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetImage = () => {
    setImage(null)
  }

  return {
    image,
    handleImageChange,
    resetImage
  }
}
