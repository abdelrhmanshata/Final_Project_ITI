import Navbar from "components/Navbar";
import Socialprofile from "./Social";

import ReviewsComponent from "./Review";
import TabsComponent from "./TabsComponent";
import Footer from "components/Footer";

// import Tabss from "./Tabs";


export default function SingleInstructor(){

    return(
<>
<Navbar />
<div class="container pt-8 pt-md-11">
        <div className="row">
            <div  className="col-xl-8 mx-xl-auto">
            <Socialprofile />
            <h1  className="text-center mb-1 " >Kathelen Monero</h1>
                <div  className="text-center mb-7 ">UI Designer</div>
         <ReviewsComponent />
         <div className="text-center mb-7">
            <div style={{ marginTop: '20px' }}>
                <a href="#" className="btn btn-teal btn-wide text-white" style={{ backgroundColor: '#06BBCC' }}>SEND MESSAGE</a>
            </div>
        </div>
    
       
       
</div>
</div>
<TabsComponent />
<Footer />

</div>
</>
    );
}