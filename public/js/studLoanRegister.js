const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhoysx4vk/upload';
const CLOUDINARY_UPLOAD_PRESET = 'studentloan_preset';

const studImage = document.getElementById('stud-img');
const studSignature = document.getElementById('stud-signature');
const coAppImage = document.getElementById('co-app-img');
const coAppSignature = document.getElementById('co-app-signature');
const bonafide = document.getElementById('bonafide');
const feeStructure = document.getElementById('fee-structure');

studImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
        document.getElementById('stud-img-url').value = res.data.secure_url;
        console.log(document.getElementById('stud-img-url').value);
    }).catch((err) => {
        console.log(err);
    });
});

studSignature.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
        document.getElementById('stud-signature-url').value = res.data.secure_url;
        console.log(document.getElementById('stud-signature-url').value);
    }).catch((err) => {
        console.log(err);
    });
});

coAppImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
        document.getElementById('co-app-img-url').value = res.data.secure_url;
        console.log(document.getElementById('co-app-img-url').value);
    }).catch((err) => {
        console.log(err);
    });
});

coAppSignature.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
        document.getElementById('co-app-signature-url').value = res.data.secure_url;
        console.log(document.getElementById('co-app-signature-url').value);
    }).catch((err) => {
        console.log(err);
    });
});

bonafide.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
        document.getElementById('bonafide-url').value = res.data.secure_url;
        console.log(document.getElementById('bonafide-url').value);
    }).catch((err) => {
        console.log(err);
    });
});

feeStructure.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
        document.getElementById('fee-structure-url').value = res.data.secure_url;
        console.log(document.getElementById('fee-structure-url').value);
    }).catch((err) => {
        console.log(err);
    });
});