import React, { useEffect, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../../css/QnA.scss";

function QnA({ id }) {
  const getAuthInfo = useSelector((state) => state);

  const [text, setText] = useState("");
  const [qnacontent, setQnacontent] = useState("");
  const [contentlist, setContentlist] = useState([]);
  const userId = !!getAuthInfo ? getAuthInfo.user.idx : "";
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
        { idx: id, qnacontent: qnacontent, writer: userId }
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
  const noInput = () => {
    if (text.length === 0) {
      alert("글을 입력해 주세요!");
    } else {
      postQna();
      onReset();
    }
  };

  useEffect(() => {
    deleteQna();
  }, []);

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
  if (getAuthInfo) {
    return (
      <div>
        <div className="qnaform">
          <textarea
            type="text"
            placeholder="판매자에게 상품 문의 입력를 입력해주세요!"
            className="qnainput"
            onChange={(e) => {
              onChange(e);
              setQnacontent(e.target.value);
            }}
            value={text}
          ></textarea>
          &nbsp;&nbsp;
          <Button
            onClick={() => {
              noInput();
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
                    <div className="qnaWrite">
                      <span>
                        {item.writer === userId
                          ? getAuthInfo.user.nickName
                          : "익명의 질문자"}{" "}
                        님의 문의 :{" "}
                      </span>
                      <span className="spanContent"> {item.content}</span>
                    </div>
                    <div className="qnaDelete">
                      {item.writer ? (
                        userId === item.writer ? (
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
  } else {
    return (
      <div className="noQna">
        <RiQuestionnaireFill className="questionMark" />
        <span className="noComment">
          문의를 하시려면 회원가입을 하셔야 합니다.
        </span>
      </div>
    );
  }
}

export default QnA;
