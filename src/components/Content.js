import React from 'react';
import { useState } from 'react';
import '../App.css';

const Content = ({data, em, inputs, loading}) => {

    let [link, setLink] = useState(false);
    let [open, setOpen] = useState(false);
    let [link2, setLink2] = useState(false);
    let [link3, setLink3] = useState(false);
    let [link4, setLink4] = useState(false);
    let [link5, setLink5] = useState(false);
    let [payment, setPayment] = useState(false);
    let [date, setDate] = useState(false);
    let errors = [];
    


    if (em.length !== 0) {
        loading.style.display = 'flex';

        setTimeout(() => {
            loading.style.display = 'none';
            inputs.style.display = 'none';
            
            setOpen(true)
    
          }, 2000);
    } 
    else {
        alert('Please input your email :)')
        window.location.reload();
    }
    


      function Normal() {


        for (var i = 0; i < data.length; i++) {

            if (em == data[i].이메일) {
                inputs.style.display = 'none';
                let 결제누적 = data[i].상태 || '미납';
                

                return (
                <div className='조회화면'>
                    <p>
                    Hello, {data[i].이름}!<br/>
                    Your reservation has been submitted successfully 😊</p>

                    <p>Room Type : <b>{data[i].숙소}</b><br/>
                    Staying Period : <b>{data[i].체크인} ~ {data[i].체크아웃}</b>
                    </p>

                    <p>&nbsp;</p>

                    <h3><b>Deposit</b></h3>


                    {

                        결제누적.indexOf("보증금") != -1 || 결제누적.indexOf("완납") != -1 || 결제누적.indexOf("보증금 월세") != -1
                        ? setLink(true)
                        : <>
                        <p>Please click the button below to pay the deposit.<br/>
                        In case of the overseas transfer, it might take a few days to be confirmed.<br/>
                        If you already did the payment, please kindly wait for the confirmation!</p>
                        <button id="납부하기" onClick={() => {setLink5(true)}}>Deposit Payment Form</button>
                        </>

                    }

                    {
                        
                        link === true
                        ? <Form />
                        : null
                    }

                    {
                        link5 === true
                        ? <보증금링크 />
                        : null
                    }                  

                </div>
                )
            } else {
                errors.push(i)
            }
        }

        if (errors.length === data.length) {
            alert('Your reservation has not been reached to us.\nPlease contact us through the button on the bottom right.');
            window.location.reload()
        }


        return <div></div>


        function 보증금링크() {
            window.location.href = `${data[i].보증금링크}`
            // window.open()
        }

        function 월세링크() {
            window.location.href = `${data[i].월세납부링크}`
        }

        function 연장폼() {
            window.location.href = 'https://airtable.com/shr7LXyaIU9nz5m8l'
        }

        


        function Form() {        

            let 납부일 = data[i].납부일 || '미납';
            let 개별납부일 = 납부일.toString().split(',');
            let 결제누적 = data[i].상태 || '미납';
            let 체크인 = data[i].체크인.toString().split('-')
            let 체크아웃 = data[i].체크아웃.toString().split('-')

            return (
                <>
                    <p>Your Deposit has been confirmed at {개별납부일[0]},</p>

                    
                    {

                        data[i].계약서발송 == null
                        ? <p>We are preparing to send you a contract in 2-3 days.<br/>
                        Contract will be sent to <b>{data[i].이메일}</b> 😊<br/>
                        (The sender's name will be 모두싸인 or modusign)</p>
                        : 결제누적.indexOf("보증금 월세") != -1
                        ? <><p>(also with the first month's rent)</p>
                        <월세영역
                        개별납부일={개별납부일}
                        결제누적={결제누적}
                        체크인={체크인}
                        체크아웃={체크아웃}
                        />
                        </>
                        : <><p>The contract has been sent to your email <b>{data[i].이메일}</b>.<br/>
                        Please check the mail sent from 모두싸인(or modusign),<br/>
                        Finish the procedure of digital signature and payment of the first month's rent.</p>
                        <월세영역
                        개별납부일={개별납부일}
                        결제누적={결제누적}
                        체크인={체크인}
                        체크아웃={체크아웃}
                        />
                        </>

                    }
         
                </>
            )
        }

        function 월세영역({개별납부일, 결제누적, 체크인, 체크아웃}) {

            let 체크인월 = 체크인[1];
            let 체크아웃월 = 체크아웃[1];
            let 투숙개월 = 체크아웃월 - 체크인월 + 1;
            let 해당납부월 = 개별납부일.toString().split('-')[1];
            

            // function 월세반복() {
            //     // for (var i = 0; i < 투숙개월; i++) {
            //     //     document.getElementById('ddd').innerHTML
            //     //      += "<p>Monthly rent for 2022-${체크인월+i} has been confirmed at ${개별납부일[1+i]}.<br/></p>";
            //     // }
            
            

            //     //  if (개별납부일[1]+i < 체크아웃월) {
            //     //     document.getElementById('월세내역').innerHTML
            //     //     += `<p>Your next payment date is : ${해당납부월}/${체크인[2]}</p>`
            //     //  }

            //     return <div id="ddd"></div>
            // }

            return (
                <>
                <p>&nbsp;</p>

                <h3><b>Monthly Rent</b></h3>

                {
                    결제누적.indexOf("월세") != -1 || 결제누적.indexOf("보증금 월세") != -1
                    ? <><p>Your last payment has been confirmed at {개별납부일[개별납부일.length - 1]},<br/>
                    please refer to that your payment date is <b>every {체크인[2]} of the month</b>.</p>
                    <p>If you want to extend your stay, please click the button below 😎</p>
                    <button id="납부하기" onClick={() => {setLink3(true)}}>Request for the extension!</button></>
                    : 결제누적.indexOf("완납") != -1
                    ? <><p>All of your Monthly rent has been confirmed successfully! (at {개별납부일[개별납부일.length - 1]})</p>
                    <p>If you want to extend your stay, please click the button below 😎</p>
                    <button id="납부하기" onClick={() => {setLink3(true)}}>Request for the extension!</button>
                    </>
                    : <>
                    <p>Your monthly rent has not been reached to us yet.<br/>
                    Please click the button below to pay the monthly rent.<br/>
                    In case of the overseas transfer, it might take a few days to be confirmed.</p>
                    <button id="납부하기" onClick={() => {setLink4(true)}}>Rent Payment Form</button>
                    </>
                }

                {
                    link4 === true
                    ? <월세링크 />
                    : null
                }

{
                    link3 === true
                    ? <연장폼 />
                    : null
                }   
                </>
            )
        }
        
      }

      return (
        <div>
            {
                open === true
                ? <Normal />
                : null
            }
        </div>
    )
}
export default Content