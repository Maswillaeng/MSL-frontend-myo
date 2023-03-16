import React from 'react';

const UserWriteContents = () => {
    return (
        <>
            <div className="text-center p-5">
                <div className="h-52 overflow-hidden rounded-md">
                    <img src="https://cdn.pixabay.com/photo/2013/02/21/19/06/drink-84533_1280.jpg" />
                </div>
                <div className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis">
                    내가 썼어요 내가 썼다고요 ㅠㅠbbbb
                </div>
                <span className="text-sm pr-3">
                                2023.03.03
                            </span>
                <span className="text-sm pl-3">
                                💗 1
                            </span>
            </div>
        </>
    );
};

export default UserWriteContents;