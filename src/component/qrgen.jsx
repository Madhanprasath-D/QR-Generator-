import React, { useState } from 'react'
import './com css/qrgen.css'
export const QRgen = () => {
    const [loding, setloding] = useState(false);
    const [qrimg, setqrimg] = useState();
    const [urldata, seturldata] = useState("");
    const [qrsize, setqrsize] = useState(250);

    function generateQR() {
        setloding(true);
        try {
            const url_from_api = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}*${qrsize}&data=${encodeURIComponent(urldata)}`;
            setqrimg(url_from_api);
            console.log(url_from_api)
            console.log(urldata)
            console.log(qrsize)
        } catch (err) {
            console.error("Error at generateQR func", err);
        } finally {
            setloding(false)
        }
    }

    function downloadQR(){
        fetch(qrimg).then((res)=>res.blob()).then((blob)=>{
            const anchor = document.createElement("a");
            anchor.href = URL.createObjectURL(blob);
            anchor.download = "qrcode.png";
            document.body.append(anchor);
            anchor.click();
            document.body.remove(anchor);
            window.location.reload(true);
        }).catch((err)=>{
            console.error("Error at downloadQR", err);
        });
    }

    return (
        <div className='continer'>
            <h3>QR GENRATOR</h3>
            {loding && <p>Please wait...</p>}
            {qrimg && <img src={qrimg} alt="img" />}
            <label htmlFor="urlpath" className='label_input'>Enter the url</label>
            <input type="text" id='urlpath' placeholder='Domain' className='input_box'
                onChange={(e) =>
                    seturldata(e.target.value)
                } value={urldata} />
            <label htmlFor="size" className='label_input'>Enter the Size in px</label>
            <input type="number" id='size' placeholder='size' className='input_box'
                onChange={(e) =>
                    setqrsize(e.target.value)
                } value={qrsize} />
            <div className="btn_continer">
                <button className='btn1' onClick={generateQR}>Generate QR</button>
                <button className='btn2' onClick={downloadQR}>Download QR</button>
            </div>
        </div>
    )
}
