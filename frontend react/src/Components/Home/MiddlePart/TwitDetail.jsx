// src/Components/Home/MiddlePart/TwitDetail/TwitDetail.jsx
import React, { useEffect, useState } from 'react';
import TwitCard from './TwitCard/TwitCard';
import { useDispatch, useSelector } from 'react-redux';
import { findTwitsById } from '../../../Store/Tweet/Action';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, Button } from '@mui/material';

const TwitDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { twit, theme } = useSelector((store) => store);
  const navigate = useNavigate();

  // show-more state (optional)
  const [visibleCount, setVisibleCount] = useState(2);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (param.id) dispatch(findTwitsById(param.id));
    setVisibleCount(2);
    setExpanded(false);
  }, [param.id, dispatch]);

  const handleBack = () => navigate(-1);

  const replies = Array.isArray(twit?.twit?.replyTwits) ? [...twit.twit.replyTwits].reverse() : [];
  const totalReplies = replies.length;
  const visibleReplies = replies.slice(0, visibleCount);

  return (
    <div className="max-w-3xl mx-auto">
      <section
        className={`z-50 flex items-center sticky top-0 px-4 ${
          theme.currentTheme === "light" ? "bg-white" : "bg-[#0D0D0D]"
        } bg-opacity-95 border-b border-gray-200`}
        style={{ gap: 12 }}
      >
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="py-3 text-xl font-bold opacity-90">Twit</h1>
      </section>

      <div className="mt-4 px-4">
        {twit?.twit ? (
          <>
            <TwitCard twit={twit.twit} />
            <Divider sx={{ margin: "1rem 0" }} />
          </>
        ) : (
          <div className="py-6 text-center text-gray-500">Loading...</div>
        )}

        <div id="replies-top" className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-700">Replies ({totalReplies})</h2>
        </div>

        <div>
          {visibleReplies.length === 0 && <div className="text-sm text-gray-500 py-4">No replies yet.</div>}

          {visibleReplies.map((reply) => (
            <div key={reply.id} className="pl-6">
              <TwitCard twit={reply} />
            </div>
          ))}

          {totalReplies > 2 && !expanded && (
            <div className="flex justify-center mt-2">
              <Button size="small" onClick={() => { setVisibleCount(totalReplies); setExpanded(true); }}>
                Show more comments
              </Button>
            </div>
          )}

          {expanded && totalReplies > 2 && (
            <div className="flex justify-center mt-2">
              <Button size="small" onClick={() => { setVisibleCount(2); setExpanded(false); }}>
                Show less
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitDetail;
