import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike'; // Java 코드 모드 추가
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  // JDoodle API 정보 (예시, 실제 값으로 대체 필요)
  const JDoodleClientId = 'YOUR_CLIENT_ID';
  const JDoodleClientSecret = 'YOUR_CLIENT_SECRET';

  // 코드 실행 함수
  const runCode = async () => {
    try {
      const response = await fetch('https://api.jdoodle.com/v1/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: code,
          language: 'java',
          versionIndex: '4', // Java 8
          clientId: JDoodleClientId,
          clientSecret: JDoodleClientSecret,
        }),
      });
      const result = await response.json();
      setOutput(result.output); // 실행 결과를 output에 설정
    } catch (error) {
      setOutput('Error executing code');
      console.error('Execution Error:', error);
    }
  };

  return (
    <div id="container">
      {/* 문제 섹션 */}
      <div id="problem-section" className="section">
        <h2>문제</h2>
        <p>간단한 Java 프로그램을 작성해보세요. "Hello, World!"를 출력하는 코드를 입력하세요.</p>
        <p><strong>예시 문제:</strong> 아래의 코드를 입력하여 실행 결과에 "Hello, World!"가 출력되도록 하세요.</p>
        <pre>
          {`public class HelloYou {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
        </pre>
      </div>

      {/* 코드 입력 섹션 */}
      <div id="editor-section" className="section">
        <h2>코드 입력</h2>
        {/* CodeMirror 편집기 */}
        <CodeMirror
          value={code}
          options={{
            mode: 'text/x-java', // Java 모드 설정
            theme: 'material',    // 테마 설정 (Material)
            lineNumbers: true,    // 라인 번호 표시
            tabSize: 4,
            indentWithTabs: true
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />
        <button id="run-button" onClick={runCode}>실행</button>
      </div>

      {/* 실행 결과 섹션 */}
      <div id="output-section" className="section">
        <h2>실행 결과</h2>
        <div id="output">{output}</div>
      </div>
    </div>
  );
}

export default App;
