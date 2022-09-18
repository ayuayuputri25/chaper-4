import React, { useEffect, useState }  from 'react'
import firebaseApp from '../config/firebaseConf';
import { getFirestore, collection } from 'firebase/firestore';
import { Col, Row, Button, Modal, Container } from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/firestore'
import PostTweet from './PostTweet';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const MainSection = () => {
    const auth = getAuth();
  const [ user,, ] = useAuthState(auth)
    const [value,snapshot,] = useCollection(
      collection(getFirestore(firebaseApp), 'tweet'),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );
  
      useEffect(() => {
        console.log(snapshot)

      },[snapshot])


    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editTweet, setEditTweet] = useState({
      id: null,
      email: '',
      tweet: ''
    });
    const [deleteTweet, setDeleteTweet] = useState({
      id: null,
      email: '',
      tweet: ''
    });
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  
    const handleClose = () => {
      setEditTweet({
        id: null,
        email: '',
        tweet: ''
      })
      setDeleteTweet({
        id: null,
        email: '',
        tweet: ''
      })
      setShow(false);
      setModalType('');
    };
    const handleShow = () => setShow(true);
  
    const onHandleDelete = (id, email, tweet) => {
      setModalType('delete');
      setDeleteTweet({...deleteTweet, id, email, tweet});
      setShow(true);
    }
  
    const onHandleEdit = (id, email, tweet) => {
      setModalType(prevModalType => 'edit');
      setEditTweet({...editTweet, id, email, tweet});
      setShow(true);
    }
  
    const handleDeleteTweet = async () => {
      try {
        setIsLoadingDelete(true);
        destroyTweet(deleteTweet.id);
      } catch (error) {
        console.log(error)
      }
      setIsLoadingDelete(false)
      handleClose();
    }
  return (
    <Container>
         <Col xs={12} sm={10} md={9} lg={6} className="main_bar">
    <Row className="justify-content-between align-items-center ps-1 top-0 bg-white" style={{ width: '660px' }}>
        <Col xs={6} lg={6} className="pt-4">
            <span className="d-flex fs-4 fw-bold">Dashboard</span>
        </Col>
        <Col className="pt-4">
        <Button className="rounded-pill border text-light col-lg-4 col-sm-4" onClick={handleShow} variant="info">Post</Button>
        </Col>
    </Row>
    <Row className="mt-4">
    {value && value?.docs?.map((doc) => ( 
        <Row className="mt-2 p-3 border rounded" key={doc.id}>
          <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1} className="text-mt-2">

              {/* <img className="rounded-circle" src={ProfileImage} alt="" height="50px"/> */}
          </Col>
          <Col xs={10} sm={10} md={11} lg={11} xl={11} xxl={11} className="px-5">
              <Row className="d-flex justify-content-between align-items-center ">
                  <Col xs={10} className="pt-2">
                      <div>
                          <p><span className="fw-bold">{doc.data().email} </span></p>
                      </div>
                  </Col>
                  <Col xs={2}>
                      <div className="d-flex justify-content-end">
                      {doc.data().email === user?.email && <span onClick={() => onHandleEdit(doc.id, doc.data().email, doc.data().tweet)}><i className="fa-solid fa-pen fs-6 mx-2"></i></span>}
                          {doc.data().email === user?.email && <span onClick={() => onHandleDelete(doc.id, doc.data().email, doc.data().tweet)}><i className="fa-solid fa-trash fs-6"></i></span>}
                      </div>
                    
                  </Col>
              </Row>
              <Col>
              {doc.data().tweet}
                  <br/>
                  <Row className="pt-4">
                      <Col><i className="fa-solid fa-heart text-danger"></i></Col>
                  </Row>
              </Col>
          </Col>
        </Row>
        ))}
    </Row>
    <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{
            (modalType === 'delete') ? 'Anda Yakin Delete Tweet?' : (modalType === 'edit') ? 'Edit Tweet' : 'Create Tweet'
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            modalType === 'delete' ? deleteTweet.tweet : <PostTweet isCreate={modalType !== 'edit'} handleClose={handleClose} editTweet={editTweet} />
          }
        </Modal.Body>
        {
          modalType === 'delete' && (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={() => handleDeleteTweet()}>
              {isLoadingDelete ? 'Loading...' : 'Delete'}
              </Button>
            </Modal.Footer>
          )
        }
      </Modal>
</Col>

    </Container>
    
  )
}

export default MainSection