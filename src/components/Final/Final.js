import React from 'react'
import './Final.scss'

const final = (props) => {
    let classes = props.isMobile ? 'Final' : 'Final shadow-box'
    
    return(
        <section className={classes}>
            <p>Спасибо, анкета отправлена!</p>
            <p>Мы все проверим и свяжемся с тобой в течение 2-3 рабочих дней.<br/>
                Не переживай, если сразу не получил обратной связи, мы обязательно дадим тебе ответ по заявке.</p>
            <p>Удачи!</p>
        </section>
    )
}

export default final