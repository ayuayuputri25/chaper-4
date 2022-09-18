import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
// import { createTweet, patchTweet } from '../api/tweet';
import constant from '../utils/constants';

const PostTweet = ({handleClose, isCreate,}) => {
    const [tweet, setTweet] = useState({
        email: '',
        tweet: ''
      })
      const [editTweet, setEditTweet] = useState({
        id: null,
        email: '',
        tweet: ''
      });    
    const [errTweet, setErrTweet] = useState({
        email: '',
        tweet: ''
    });

		const [loading, setLoading] = useState(false)

		const onHandleSubmit = () => {
			// if (tweet.email === '') {
			// 		setErrTweet({...errTweet, email: constant.errorMessage.Email.Required})
			// }
			// else if (isValidEmail(tweet.email)) {
			// 		setErrTweet({...errTweet, email: constant.errorMessage.Email.validEmail})
			// }
			if (tweet.tweet === '') {
					setErrTweet({...errTweet, tweet: constant.errorMessage.Tweet.Required})
			} else {
					if (isCreate) {
							createDoc()
					} else {
							updateTweet()
					}
			}
		}

		const createDoc = async () => {
			try{
				setLoading(true)
				createTweet(tweet)
			} catch (error){
				console.log(error)
			}
			setLoading(false)
			handleClose()
		}

		const updateTweet = async () => {
			try {
				setLoading(true)
				patchTweet(tweet, editTweet.id)
			} catch (error) {
				console.log(error)
			}
			setLoading(false)
			handleClose()
		}

        useEffect(() => {
			setTweet({...tweet, email: editTweet.email, tweet: editTweet.tweet})
		},[])
  

  
    return (
    <div>
        <Container>
        <Row className="mt-4 justify-content-center">
            <Col md={10}>
                <Row className="bg-white">
                    <Row className='py-2'>
                        <Col xs={2}>
                            {/* <img className="rounded-circle"  alt="" height="50px"/> */}
                        </Col>
                        <p></p>
                        <Col>
                        </Col>
                    </Row>
                    <Col xs={12} sm={12}>
                        <Form>
                        <Row className="g-2">
                        {/* <Form.Label>Email</Form.Label>
                        { <Form.Control type="text" placeholder="Enter Email" value={tweet.email}
														onFocus={(e) => setErrTweet({...errTweet, email: ''})}
                            onChange={(e) => setTweet({...tweet,email:e.target.value})}></Form.Control> }
                            {
                                errTweet.email !== '' && (
                                    <Form.Text className="text-danger">
                                    { errTweet.email }
                                    </Form.Text>
                                )
                            } */}
                        <Form.Label>Write Tweet</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Tweet" style={{ height:'100px'}} value={tweet.tweet}
														onFocus={(e) => setErrTweet({...errTweet, tweet: ''})}
                            onChange={(e) => setTweet({...tweet,tweet:e.target.value})}></Form.Control>
                            {
                                errTweet.tweet !== '' && (
                                    <Form.Text className="text-danger">
                                    { errTweet.tweet }
                                    </Form.Text>
                                )
                            }
                          <Row className="py-2 justify-content-end">
                              <Col xs={3} sm={2} className="py-2">
                                  <Button variant='info' className="text-white px-4 rounded-pill"
                                    onClick={(e) => onHandleSubmit()} >
                                    {loading ? 'Loading...' : isCreate ? 'Post' : 'Update'}</Button>
                              </Col>
                          </Row>
                        </Row>  
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Container>
    </div>
  )
}

export default PostTweet