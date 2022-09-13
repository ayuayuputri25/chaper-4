import { useState, useEffect } from 'react'
import { Container, Row, Col,Form, Button, Spinner,Alert } from 'react-bootstrap'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { getAuth} from 'firebase/auth'
import FirebaseApp  from '../config/firebaseConfig'
import { useNavigate, } from 'react-router-dom'


const auth = getAuth(FirebaseApp)
const errorDict = {
    'auth/wrong-password' : 'Password anda salah!',
    'auth/internal-error' : 'Password harus diisi!',
    'auth/invalid-email' : 'Email harus diisi!'
}

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,] = useSignInWithEmailAndPassword(auth)

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
                    <Button disabled={loading} variant="primary" type="button" onClick={()=> signInWithEmailAndPassword(credentials.email, credentials.password)} >
                       {loading && <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true" 
                        />}
                        {loading ? 'loading...' : 'login'}
                    </Button>
                </Form>
            </Col>
          { error && <Alert variant="danger">
                 {error && errorDict[error.code]}
            </Alert>}
        </Row>


    </Container>
    
  )
}

export default Login
