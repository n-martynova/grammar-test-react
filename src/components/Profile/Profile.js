import React, { Component } from 'react'
import './Profile.scss'
import * as yup from 'yup'
import InputMask from 'react-input-mask'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: '',
            social: '',
            cv: '',
            about: '',

            nameError: '',
            emailError: '',
            phoneError: '',
            socialError: '',
            cvError: '',
            aboutError: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.displayErrorMessages = this.displayErrorMessages.bind(this)
        this.handleInvalidFocus = this.handleInvalidFocus.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.profileSchema = yup.object().shape({
            name: yup
                .string()
                .required('Обязательное поле')
                .min(5, 'Имя слишком короткое'),
            email: yup
                .string()
                .email('Неправильный email')
                .required('Обязательное поле'),
            phone: yup
                .string()
                .length(18, 'Телефон слишком короткий')
                .required('Обязательное поле'),
            social: yup
                .string()
                .url('Неправильный формат ссылки'),
            cv: yup
                .string()
                .url('Неправильный формат ссылки'),
            about: yup
                .string()
                .min(250, 'Не похоже на подробный рассказ :(')
                .required('Обязательное поле'),
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.profileSchema.isValid(
                {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    social: this.state.social,
                    cv: this.state.cv,
                    about: this.state.about
                }).then((valid) => {
                    if (valid) {
                        this.props.showFinal()
                    } else {
                        this.displayErrorMessages()
                    } 
                })
    }

    displayErrorMessages() {
        this.profileSchema.validate(
            {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                social: this.state.social,
                cv: this.state.cv,
                about: this.state.about
            }, { abortEarly: false })
            .catch((errors) => {
                errors.inner.forEach((error) => {
                    this.setState({
                        [error.path + 'Error']: error.message
                    })
                    const invalidInput = document.querySelector(`[name=${error.path}]`)
                    invalidInput.classList.add('invalid')
                })
                const firstInvalidInput = document.querySelector('.invalid')
                firstInvalidInput.scrollIntoView({block: 'center', behavior: 'smooth'})
            })
    }

    handleInvalidFocus(event) {
        event.target.classList.remove('invalid')
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    render() {
        const renderError = (errorName) => {
            return(
                <span className={this.state[errorName] && 'error-message'}>{this.state[errorName]}</span>
            )
        }

        return (
        <section className="Profile">
            <div className="intro">
                <p>Предлагаем тебе заполнить анкету и ответить на наши вопросы, чтобы мы начали знакомство с тобой.</p>
            </div>

            <div className='shadow-box'>
                <form onSubmit={this.handleSubmit}>
                    <h2>Анкета</h2>
                    <p>Заполните форму, и мы ответим в течение 2–3 рабочих дней.</p>

                    <div className="profile-form">
                        <div className="input-wrapper js-input-wrapper">
                            <input
                                className="js-input"
                                value={this.state.name}
                                onChange={this.handleChange}
                                type="text"
                                autoComplete="true"
                                name="name"
                                placeholder="Фамилия и имя"
                                onFocus={this.handleInvalidFocus}
                            />
                            {renderError('nameError')}
                        </div>
                        <div className="input-wrapper js-input-wrapper">
                            <input
                                className="js-input"
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="text"
                                autoComplete="email"
                                name="email"
                                placeholder="Электронная почта"
                                onFocus={this.handleInvalidFocus}
                            />
                            {renderError('emailError')}
                        </div>
                        <div className="input-wrapper js-input-wrapper">
                            <InputMask 
                                className="js-input"
                                mask="+7 (999) 999-99-99" 
                                value={this.state.phone}
                                onChange={this.handleChange} 
                                type="tel"
                                autoComplete="tel"
                                name="phone"
                                maskPlaceholder="Х"
                                alwaysShowMask={true}
                                onFocus={this.handleInvalidFocus}
                            />
                            {renderError('phoneError')}
                        </div>
                        <div className="input-wrapper js-input-wrapper">
                            <textarea
                                className="js-input"
                                value={this.state.social}
                                onChange={this.handleChange}
                                type="text"
                                name="social"
                                placeholder="Ссылка на соцсеть"
                                rows="1"
                                onFocus={this.handleInvalidFocus}
                            />
                                {renderError('socialError')}
                            <label htmlFor="social" className="horizontal-label">Ссылка на ваш профиль в&nbsp;контакте или фейсбуке</label>
                        </div>

                        <div className="input-wrapper js-input-wrapper">
                            <textarea
                                className="js-input"
                                value={this.state.cv}
                                onChange={this.handleChange}
                                type="text"
                                name="cv"
                                placeholder="Ссылка на резюме"
                                rows="1"
                                onFocus={this.handleInvalidFocus}
                            />
                            {renderError('cvError')}
                            <label htmlFor="cv" className="horizontal-label">Если есть</label>
                        </div>

                        <div className="input-wrapper js-input-wrapper">
                            <textarea
                                className="js-input"
                                value={this.state.about}
                                onChange={this.handleChange}
                                type="text"
                                name="about"
                                placeholder='Подробный рассказ о себе. Нам интересно и важно знать всё — хобби, увлечения, достижения 🙂 Почему вы подойдете нам и как вы видите эту работу? Какие в ней могут быть трудности, как их решать? Какие плюсы и почему эта работа крутая?'
                                rows="10"
                                onFocus={this.handleInvalidFocus}
                            />
                            {renderError('aboutError')}
                            <label htmlFor="about" className="horizontal-label">Сопроводительные письма очень важны, потому что работа в чате напрямую связана с письменным выражением своих мыслей. Если письмо шаблонное или состоит из двух предложений (250 символов) — считаем, что его нет <span role="img" aria-label="smile">🙂</span></label>
                        </div>
                    </div>

                    <button className="button" type="submit">Перейти к тесту</button>

                    <p className="agreement">Я соглашаюсь передать свои персональные данные, содержащиеся в анкете и всех приложенных файлах, в КИВИ Банк (АО) исключительно для того, чтобы КИВИ Банк (АО) мог предлагать мне вакансии. Я понимаю и соглашаюсь, что мои данные будут храниться и&nbsp;обрабатываться КИВИ Банк (АО) в&nbsp;течение десяти лет, в соответствии с&nbsp;Федеральным законом «О персональных данных».</p>
                    <p className="get-card">Кстати, если у вас еще нет карты Рокетбанка, заказать можно <a href="https://rocketbank.ru/welcome/" className="external-link" target="_blank" rel="noopener noreferrer">здесь</a>.</p>
                </form>
            </div>
        </section>
    )}
}

export default Profile