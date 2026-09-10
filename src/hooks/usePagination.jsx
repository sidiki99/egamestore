import { useState } from "react"

const usePagination=(data,itemsPerPage)=>{
  const[currentPage,setCurrentPage]=useState(1);
  const totalPages=Math.ceil(data.length/itemsPerPage);
  const startIndex=(currentPage-1)*itemsPerPage;
  const endIndex=startIndex+itemsPerPage;
  const currentItems = data.slice(startIndex,endIndex);
  const nextPage=()=>{
    if(currentPage< totalPages){
      setCurrentPage(currentPage + 1);
    }
  }
  const prevPage=()=>{
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
  }
  const goToPage=()=>{
    setCurrentPage(currentPage * itemsPerPage)
  }
  return{
    currentItems,currentPage,nextPage,prevPage,goToPage,totalPages,startIndex,endIndex
  }
}
export default usePagination;