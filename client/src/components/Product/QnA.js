import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../../css/QnA.scss";

function QnA({ id }) {
  const getAuthInfo = useSelector((state) => state);

  const [text, setText] = useState("");
  const [qnacontent, setQnacontent] = useState("");
  const [contentlist, setContentlist] = useState([]);

  const onReset = () => {
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const postQna = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product/detail/qna/${id}`,
        { idx: id, qnacontent: qnacontent, writer: getAuthInfo.user.idx }
      );
      console.log(res.data);
      setQnacontent(res.data);
      setContentlist([...contentlist, res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteQna = async (idx) => {
    try {
      if (idx !== undefined) {
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/product/detail/qna/${idx}`
        );

        const result = contentlist.filter((content) => content.idx !== idx);
        setContentlist(result);
      }
      //setContentlist([...contentlist, res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    deleteQna();
  });

  useEffect(() => {
    const getQna = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/detail/qna/${id}`
        );
        console.log(res.data);
        setContentlist(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getQna();
  }, [id]);

  return (
    <div>
      <div className="qnaform">
        <input
          type="text"
          placeholder="상품 문의 입력..."
          className="qnainput"
          onChange={(e) => {
            onChange(e);
            setQnacontent(e.target.value);
          }}
          value={text}
        ></input>
        &nbsp;&nbsp;
        <Button
          variant="primary"
          onClick={() => {
            postQna();
            onReset();
          }}
          className="qnabutton"
        >
          등록
        </Button>
      </div>
      <hr />
      <div>
        {contentlist &&
          contentlist.map((item, id) => {
            return (
              <div key={id}>
                <div className="qnacontent">
                  <div>
                    {item.writer === getAuthInfo.user.idx
                      ? getAuthInfo.user.nickName
                      : "익명의 질문자"}
                    : {item.content}
                  </div>
                  <div>
                    {item.writer ? (
                      getAuthInfo.user.idx === item.writer ? (
                        <Button
                          variant="secondary"
                          onClick={() => deleteQna(item.idx)}
                        >
                          삭제
                        </Button>
                      ) : (
                        <div>
                          <Button variant="danger" disabled>
                            삭제불가
                          </Button>
                        </div>
                      )
                    ) : (
                      <Button variant="danger" disabled>
                        삭제불가
                      </Button>
                    )}
                  </div>
                </div>
                <hr style={{ width: "100%" }} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default QnA;
