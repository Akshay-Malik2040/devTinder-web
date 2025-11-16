import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,about}=user
    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure className='w-full h-50'>
                    <img
                        src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                        alt="profileImg" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName+" "+lastName}</h2>
                    <p>{about}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard