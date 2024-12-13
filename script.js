// app.js

// Firebase 설정 (Firebase Console에서 제공한 설정)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Firebase 초기화
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 폼 제출 시 데이터 저장
const form = document.getElementById('studentForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();  // 폼 제출 기본 동작을 막음

    // 입력 값 가져오기
    const name = document.getElementById('name').value;
    const info = document.getElementById('info').value;

    // Firebase Realtime Database에 데이터 저장
    const newStudentRef = database.ref('students').push();
    newStudentRef.set({
        name: name,
        info: info
    });

    // 폼 초기화
    form.reset();
});

// 실시간으로 데이터 가져오기
const studentList = document.getElementById('studentList');
database.ref('students').on('child_added', function(snapshot) {
    const student = snapshot.val();
    const li = document.createElement('li');
    li.textContent = `${student.name}: ${student.info}`;
    studentList.appendChild(li);
});
