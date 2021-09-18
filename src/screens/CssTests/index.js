import Button from '../../components/Button'
import './cssTests.scss'

function Test() {


  return (
    <div className="mainContainer">
        submit
          <Button 
            buttonStyle ="btn--submit"
            >  Test Text</Button>
          outline<Button 
            buttonStyle ="btn--outline"
            >  Test Text</Button>
          submit large<Button 
            buttonStyle ="btn--submit"
            buttonSize ="btn--large"
            >  Test Text</Button>
          submit medium<Button 
            buttonStyle ="btn--submit"
            buttonSize ="btn--medium"
            >  Test Text</Button>
          submit small<Button 
            buttonStyle ="btn--submit"
            buttonSize ="btn--small"
            >  Test Text</Button>
            submit wide
                      <Button 
            buttonStyle ="btn--submit"
            buttonSize ="btn--wide"
            >  Test Text</Button>
    </div>
  )
}

export default Test
