import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import './UserProfile.css';
import { FaEdit } from 'react-icons/fa'

export default function ProfileUser() {
    const [name, setName] = useState("Student");
    const [email, setEmail] = useState("sarayasserma@mail.com.my");
    const [avatar, setAvatar] = useState("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
   
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatar(reader.result);
        };
    };

    const handleEditIconClick = () => {
        document.getElementById('avatarInput').click();
    };


    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
      <div className='BBody' >
      
        <div className="container rounded bg-white mt-5 mb-5 ">
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="black"
                className="tabs"
                centered
            >
                <Tab label="Profile Settings"  className="tabs" />
                <Tab label="Courses" className="tabs"/>
                
            </Tabs>
            <div className="row">
            <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <div style={{ position: 'relative' }}>
                            <img className="rounded-circle mt-20" width="150px" src={avatar} alt="User Avatar" />
                            <FaEdit
                                style={{ position: 'absolute', bottom: '0', right: '0', cursor: 'pointer', backgroundColor: 'LightGray', borderRadius: '50%', padding: '5px', width:'30px', height:'30px'}}
                                onClick={handleEditIconClick} // Call handleEditIconClick when the edit icon is clicked
                            />
                            <input
                                type="file"
                                id="avatarInput" // Add an id to the input element
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                                accept="image/*"
                            />
                        </div>
                    
                        <span className="font-weight-bold">
                            {isEditingName ? (
                                <input type="text" value={name} onChange={handleNameChange} onBlur={() => setIsEditingName(false)} />
                            ) : (
                                <span onClick={() => setIsEditingName(true)}>{name}</span>
                            )}
                        </span>
                        <span className="text-black-50">
                            {isEditingEmail ? (
                                <input type="email" value={email} onChange={handleEmailChange} onBlur={() => setIsEditingEmail(false)} />
                            ) : (
                                <span onClick={() => setIsEditingEmail(true)}>{email}</span>
                            )}
                        </span>
                        <span> </span>
                    </div>
                    </div>
                {selectedTab === 0 && (
                    <div className="col-md-8 border-right">
                    <div className="p-5 py-8">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" /></div>
                            <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" placeholder="surname" /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" /></div>
                            <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" /></div>
                            <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                            <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                            <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                            <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                            <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" /></div>
                            <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" /></div>
                        </div>
                    </div>
                </div>
                )}
                {selectedTab === 1 && (
            <div className="col-md-8 border-right">
            <div className="p-5 py-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Courses</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">CourseName</div>
                   
                </div>
                </div>
                </div>
                    
                )}
             
            </div>
        </div>
        </div>
      
    );
}
