import React, { Component } from 'react'
import Profile from './components/Profile/Profile'
import Final from './components/Final/Final'
import './App.scss'

class App extends Component {
    constructor(props) {
        super(props)
        this.showFinal = this.showFinal.bind(this)
    }

    state = {
        currentStep: 'profile'
    }

    showFinal() {
        this.setState({ currentStep: 'final' })
    }

    render() {
        const isMobile = () => {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }

        let step
        if (this.state.currentStep === 'profile') {
            step = <Profile showFinal={this.showFinal} isMobile={isMobile()} />
        } else {
            step = <Final isMobile={isMobile()} />
        }

        return (
            <div className="App">
                {step}
            </div>
        )
    }
}

export default App