import styled from 'styled-components';

export const SignupInfo = styled.div`
    display: inline-block;
    width: 55%;
    float: left;
    padding: 60px;
    h1
    {
        font-size: 40px;
        line-height: 1.4;
        padding: 30px;
        @media (max-width: 800px)
        {
            font-size: calc(60px - 30px);
            padding: 10px;
        }
    }
    p
    {
        line-height: 2;
        padding: 30px;
        margin-top: 30px;
        @media (max-width: 800px)
        {
            margin-top: 0px;
            padding: 10px;
        }
    }
    @media (max-width: 800px)
    {
        width: 100%;
        padding: 30px;
    }
`;

export const SignupFormParent = styled.div`
    width: 40%;
    display: inline-block;
    @media (max-width: 800px)
    {
        width: 100%;
    }
`;

export const Container = styled.div`
    position: relative;
    max-width: 40rem;
    margin: 5rem auto;
    background: #fff;
    width: 100%;
    padding: 3rem 5rem 0;
    border-radius: 1px;
    span
    {
        line-height: 2;
        @media (max-width: 800px)
        {
            font-size: calc(16px - 2px);
        }
    }
    .button-container
    {
        text-align: center;
        .button
        {
            position: relative;
            background: currentColor;
            border: 1px solid currentColor;
            font-size: 1.1rem;
            color: #4f93ce;
            margin: 3rem 0;
            padding: 0.75rem 3rem;
            cursor: pointer;
            -webkit-transition: background-color 0.28s ease, color 0.28s ease, box-shadow 0.28s ease;
            transition: background-color 0.28s ease, color 0.28s ease, box-shadow 0.28s ease;
            overflow: hidden;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            bottom: 30px;
            &: focus
            {
                outline: none;
                &: before
                {
                    -webkit-transition: opacity 0.28s ease 0.364s, -webkit-transform 1.12s ease;
                    transition: opacity 0.28s ease 0.364s, -webkit-transform 1.12s ease;
                    transition: transform 1.12s ease, opacity 0.28s ease 0.364s;
                    transition: transform 1.12s ease, opacity 0.28s ease 0.364s, -webkit-transform 1.12s ease;
                    -webkit-transform: translate(-50%, -50%) scale(1);
                            transform: translate(-50%, -50%) scale(1);
                    opacity: 0;
                }
            }
            &: before
            {
                content: '';
                position: absolute;
                background: #071017;
                border: 50vh solid #1d4567;
                width: 30vh;
                height: 30vh;
                border-radius: 50%;
                display: block;
                top: 50%;
                left: 50%;
                z-index: 0;
                opacity: 1;
                -webkit-transform: translate(-50%, -50%) scale(0);
                transform: translate(-50%, -50%) scale(0);
            }
            &: hover
            {
                color: #337ab7;
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
            }
            &: active
            {
                &: before
                {
                    -webkit-transition: opacity 0.28s ease 0.364s, -webkit-transform 1.12s ease;
                    transition: opacity 0.28s ease 0.364s, -webkit-transform 1.12s ease;
                    transition: transform 1.12s ease, opacity 0.28s ease 0.364s;
                    transition: transform 1.12s ease, opacity 0.28s ease 0.364s, -webkit-transform 1.12s ease;
                    -webkit-transform: translate(-50%, -50%) scale(1);
                            transform: translate(-50%, -50%) scale(1);
                    opacity: 0;
                }
            }
            span
            {
                color: #fff;
                position: relative;
                z-index: 1;
            }
        }
    }
    &: before
    {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
        -webkit-transform: scale(0.98);
                transform: scale(0.98);
        -webkit-transition: -webkit-transform 0.28s ease-in-out;
        transition: -webkit-transform 0.28s ease-in-out;
        transition: transform 0.28s ease-in-out;
        transition: transform 0.28s ease-in-out, -webkit-transform 0.28s ease-in-out;
        z-index: -1;
    }
    &: hover :before
    {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    @media (max-width: 800px)
    {
        margin: 0px;
        max-width: 100%;
        padding: 3rem 2rem 0;
    }
`;

export const SignupForm = styled.form`
    h1
    {
        font-size: 2rem;
        text-align: center;
        margin: 0 0 2em;
    }
`;

export const CheckBox = styled.div`
    margin-top: 3rem;
    margin-bottom: 1rem;
    label
    {
        position: relative;
        cursor: pointer;
        padding-left: 2rem;
        text-align: left;
        color: #333;
        display: block;
        &: hover .helper
        {
            color: #337ab7;
        }
    }
    input
    {
        width: auto;
        opacity: 0.00000001;
        position: absolute;
        left: 0;
        &: checked ~ .helper
        {
            color: #337ab7;
            &: after
            {
                height: 0.5rem;
            }
            &: before
            {
                height: 1.2rem;
                -webkit-transition-delay: 0.28s;
                transition-delay: 0.28s;
            }
            &: before, &: after
            {
                opacity: 1;
                -webkit-transition: height 0.28s ease;
                transition: height 0.28s ease;
            }
        }
    }
    .helper
    {
        color: #999;
        position: absolute;
        top: 0;
        left: 0;
        width: 1rem;
        height: 1rem;
        z-index: 0;
        border: 0.125rem solid currentColor;
        border-radius: 0.0625rem;
        -webkit-transition: border-color 0.28s ease;
        transition: border-color 0.28s ease;
        &: before
        {
            top: 0.65rem;
            left: 0.38rem;
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
            box-shadow: 0 0 0 0.0625rem #fff;
        }
        &: after
        {
            top: 0.3rem;
            left: 0;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        &: before, &: after
        {
            position: absolute;
            height: 0;
            width: 0.2rem;
            background-color: #337ab7;
            display: block;
            -webkit-transform-origin: left top;
            transform-origin: left top;
            border-radius: 0.25rem;
            content: '';
            -webkit-transition: opacity 0.28s ease, height 0s linear 0.28s;
            transition: opacity 0.28s ease, height 0s linear 0.28s;
            opacity: 0;
        }
    }
`;

export const InputFieldDiv = styled.div`
    position: relative;
    margin-top: 2.25rem;
    margin-bottom: 2.25rem;
    input
    {
        height: 1.9rem;
        display: block;
        background: none;
        padding: 0.125rem 0.125rem 0.0625rem;
        font-size: 1rem;
        border-width: 0;
        border-color: transparent;
        line-height: 1.9;
        width: 100%;
        color: transparent;
        -webkit-transition: all 0.28s ease;
        transition: all 0.28s ease;
        box-shadow: none;
        &: focus
        {
            outline: none;
            & ~ .control-label
            {
                color: #337ab7;
            }
            & ~ .bar: before
            {
                width: 100%;
                left: 0;
            }
        }
        &: valid, &: focus
        {
            color: #333;
        }
        &:focus ~ .control-label, &:valid ~ .control-label
        {
            font-size: 0.8rem;
            color: gray;
            top: -1rem;
            left: 0;
        }
    }
    .control-label
    {
        position: absolute;
        top: 0.25rem;
        pointer-events: none;
        padding-left: 0.125rem;
        z-index: 1;
        color: #b3b3b3;
        font-size: 1rem;
        font-weight: normal;
        -webkit-transition: all 0.28s ease;
        transition: all 0.28s ease;
    }
    .bar
    {
        position: relative;
        border-bottom: 0.0625rem solid #999;
        display: block;
        &: before
        {
            content: '';
            height: 0.125rem;
            width: 0;
            left: 50%;
            bottom: -0.0625rem;
            position: absolute;
            background: #337ab7;
            -webkit-transition: left 0.28s ease, width 0.28s ease;
            transition: left 0.28s ease, width 0.28s ease;
            z-index: 2;
        }
    }
`;