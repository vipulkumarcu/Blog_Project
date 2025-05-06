import React from "react";
import appwriteService from "../../Appwrite_Services/storageService";
import { Link } from "react-router-dom";
import fallback from "../../Assets/fallback.jpg";

function Card ( { $id, title, featuredImage } )
{
  const fileUrl = appwriteService.getFilePreview ( featuredImage );

  return (
    <Link to = { `/post/${ $id }` } >

      <div className = "w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition" >

        <div className = "w-full justify-center mb-4" >
          <img
            src = { fileUrl }
            alt = { title }
            className = "rounded-xl object-cover h-48 w-full"
            onError = { ( e ) => ( e.target.src = { fallback } ) }
          />
        </div>

        <h2 className = "text-xl font-bold" > { title } </h2>

      </div>

    </Link>
  );
}

export default Card;