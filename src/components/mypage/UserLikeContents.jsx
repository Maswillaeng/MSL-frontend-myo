import React from 'react';

const UserLikeContents = () => {
    return (
        <>
            <div className="text-center p-5">
                <div className="h-52 overflow-hidden rounded-md">
                    <img src="https://cdn.pixabay.com/photo/2015/07/15/19/34/cocktail-846833_1280.jpg" />
                </div>
                <div className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis">
                    이 글 너무 좋아 너무 좋다고요 ㅠㅠdddd
                </div>
                <span className="text-sm pr-3">
                                    2023.03.01
                                </span>
                <span className="text-sm pl-3">
                                    💗 100
                                </span>
            </div>
        </>
    );
};

export default UserLikeContents;