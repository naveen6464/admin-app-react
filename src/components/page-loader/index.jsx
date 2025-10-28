import React from "react";
import { hostConfig } from "../../config";

const PageLoader = ()=> {
  return (
    <div>
      <div className={`flex justify-center items-center table_content_style`}>
        {/* <Image src={Loader} alt="Truekarma Loader" width={300} height={300} /> */}
        <img src={`${hostConfig.TRUEKARMA_S3_URL}loader/TrueKarma-Loader-compressed.gif`} alt="Truekarma Loader" width={200} height={170} />
       
      </div>
    </div>
  );
}

export default PageLoader;
