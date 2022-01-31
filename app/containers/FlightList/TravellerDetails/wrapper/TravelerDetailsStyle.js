import styled from 'styled-components';

export const SidebarTravellerDetails = styled.div`
    flex-basis: 24%;
    .additional-info,
    .summary
    {
        width: 100%;
        background: #fff;
        -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
        box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 5px;
        h3
        {
            font-size: 16px;
            text-align: center;
            font-weight: bold;
            padding: 10px 0px;
        }
    }
    .summary
    {
        font-weight: bold;
        .summary-sub
        {
            display: flex;
            flex-direction: row;
            width: 100%;
            padding: 5px;
            p
            {
                flex-basis: 45%;
                margin: auto;
                text-align: left;
                padding: 10px 10px 10px 10px;
                @media (max-width: 950px)
                {
                    font-size: calc(16px - 3px);
                }
            }
            span
            {
                flex-basis: 55%;
                margin: auto;
                text-align: right;
                padding: 10px 10px 10px 10px;
            }
        }
        .price
        {
            float: right;
            color: #378edd;
        }
        @media(max-width: 1400px)
        {
            font-size: 12px;
        }
    }
    .additional-info
    {
        .add-sec
        {
            padding: 10px;
            font-size: 15px;
            display: flex;
            flex-direction: column;
            .location
            {
                margin-bottom: 10px;
                font-weight: bold;
                .loc-inner
                {
                    p
                    {
                        flex-basis: 25%
                        @media (max-width: 950px)
                        {
                            font-size: calc(16px - 3px);
                        }
                    }
                    .address, .flight-info
                    {
                        color: #378edd;
                    }
                    .bound
                    {
                        flex: 100%;
                        text-align: center;
                        justify-content: center;
                        color: #FCB040;
                    }
                }
            }
            @media(max-width: 1400px)
            {
                font-size: 12px;
            }
        }
    }
    @media(max-width: 800px)
    {
        flex-basis: 100%;
    }
`;

export const TravelerParent = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    margin-top: 20px;
    .InfoParent
    {
        flex-basis: 75%;
        max-width: 100%;
        margin-left: calc(10px - 3px);
        padding: 10px;
        box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
        background-color: #fff;
        overflow: hidden;
        .heading
        {
            text-align: center;
            width: 100%;
            margin-bottom: 1%;
        }
        .MainAdultForm
        {
            margin-top: 1%;
            padding: 1%;
            .contact, .PayInfo
            {
                flex-direction: column;
                text-align: center;
                .cont-details
                {
                    justify-content: center;
                }
            }
            .separator
            {
                width: 100%;
                margin-bottom: 10px;
            }
            .submit
            {
                flex-direction: row-reverse;
                @media(max-width: 800px)
                {
                    flex-direction: row;
                    justify-content: center;
                }
            }
            .PAXInfo
            {
                display: flex;
                flex-direction: column;
                h3
                {
                    flex-basis: 100%;
                    text-align: center;
                }
            }
        }
        @media(max-width: 800px)
        {
            flex-basis: 100%;
        }
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    max-width: 100%;
    padding: 5px;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button
    {
        -webkit-appearance: none;
    }
    .inner-row
    {
        label{
          font-weight: bold;
        }
        display: flex;
        flex-direction: column;
        flex-basis: 33%;
        text-align: left;
        padding: 5px;
        .nation
        {
            width: 100%;
        }

        .dates
        {
            display: flex;
            select
            {
                width: 100%;
            }
        }
        select
        {
            font-size: 14px;
            padding: 10px 10px;
        }
        input
        {
            padding: 10px 10px;
        }

        .pay-label
        {
            margin-left: 25px;
            margin-top: -15px;
        }
        .warning{
          color: maroon;
        }
    }
    @media(max-width: 800px)
    {
        flex-direction: column;
    }
    .cmng-soon
    {
        width: 50%;
        margin: auto;
    }
    .proceed
    {
        margin-left: 5px;
        border-radius: 3px;
        text-shadow: 0px 0px 2px #776565;
        font-weight: bold;
        font-size: 16px;
        background: #378edd;
        color: #ffffff;
        padding: 12px 10px;
        border: none;
        transition: backgroung 0.5s;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
        float: right;
        &: hover
        {
            background: #fcb040;
        }
    }
`;

export const FailedBooking = styled.div`
    text-align: center;
    justify-content: center;
    margin-top: 201px;
    margin-bottom: 205px;
    *
    {
        margin-bottom: 30px;
    }
    .foot
    {
        text-align: center;
        margin-bottom: 20px;
        a
        {
            margin-left: 5px;
            border-radius: 3px;
            text-shadow: 0px 0px 2px #776565;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            background: #378edd;
            color: #ffffff;
            padding: 12px 10px;
            border: none;
            transition: backgroung 0.5s;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
            &: hover
            {
                background: #fcb040;
            }
        }
    }
`;