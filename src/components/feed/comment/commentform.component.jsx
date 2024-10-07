import React, { useContext, useState } from 'react'
import { UserContext } from '../../../App'
import { ApiContext } from '../../../contexts/apiprovider'
import { PostContext } from '../feed.component'

const CommentformComponent = (props) => {

    const { post } = props

    const { user } = useContext(UserContext)
    const { PostComment } = useContext(ApiContext)

    const { FetchPosts } = useContext(PostContext)

    const [comment, setComment] = useState()

    async function handleSubmit(event){
        event.preventDefault()
        setComment("")
        try  {
            await PostData()
            FetchPosts()
        } catch(error) {
            console.error(error)
        }
    }

    function handleInput(event){
        setComment(event.target.value)
    }

    const PostData = async () => {
        await PostComment(comment, post.id, user.id)
    }

    return (
        <>
            <form className="commentform-form" onSubmit={handleSubmit}>
                <div style={{backgroundColor: user.favouriteColour}} className="postbody-profilepicture">
                        {user.profileImage ? (
                            <>
                                <img style={{borderRadius: '100px', width: 50, height: 50}} src={user.profileImage}/>
                            </>
                        ) : (
                            <>
                                <p>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</p>
                            </>
                        )}
                        
                </div>

            <div  className="commentform-input-wrapper">
               
                
                <input
                    name="content"
                    value={comment}
                    onChange={handleInput}
                    className="commentform-input"
                    placeholder='Add a comment...'
                />
               <button className="commentform-btn">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30"><path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z"/></svg>
               </button>
            </div>

            </form>
        
        </>
    )
}

export default CommentformComponent
