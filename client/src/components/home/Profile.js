import React from 'react';

class Profile extends React.Component {

    render() {
        const { user } = this.props;

        return (
            <>
                <div className="profile_container">
                    <div className="top">
                        <p>{user.first} {user.last}</p>
                    </div>
                    <div className="main">
                        <p>Total Service Hours</p>
                        <span className="hours"> {user.hours} </span>
                    </div>
                </div>
            </>
        );
    };
};

export default Profile;