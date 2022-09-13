import { useState, useEffect } from 'react'
import { Container, Row, Col,Form, Button } from 'react-bootstrap'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { getAuth} from 'firebase/auth'
import FirebaseApp  from '../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'


const auth = getAuth(FirebaseApp)

const Register = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    const [
        createUserWithEmailAndPassword,
        user,
        ] = useCreateUserWithEmailAndPassword(auth)

    useEffect(() => {
        if(user !== undefined)
          navigate('/dashboard', {replace: true})
    }, [user, navigate])


  return (
    <Container>
        <Row>
            <Col xs={12} md={{span: 6, offset:3}} className="border" >
               <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setCredentials({...credentials, email: e.target.value})} value={credentials.email} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} value={credentials.password} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={()=> createUserWithEmailAndPassword(credentials.email, credentials.password)} >
                        Register
                    </Button>
                </Form>
            </Col>
        </Row>


    </Container>
    
  )
}

export default Register
