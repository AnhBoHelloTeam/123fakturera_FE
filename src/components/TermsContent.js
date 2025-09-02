import React from 'react';

function TermsContent({ content }) {
  return (
    <div className="terms-content" dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export default TermsContent;