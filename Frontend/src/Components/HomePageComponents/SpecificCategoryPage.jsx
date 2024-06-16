import React from 'react'
import { useParams } from 'react-router-dom'

function SpecificCategoryPage() {
      const params = useParams()
  return (
    <div>
      {params.productcategory}
    </div>
  )
}

export default SpecificCategoryPage
