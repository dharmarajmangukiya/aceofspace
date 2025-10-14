const SingleAgentInfo = ({ propertyDetail }) => {
  // owner object expected as per context
  const owner = propertyDetail?.owner || {};

  // fallback if no names, combine as needed
  const displayName =
    owner?.firstName || owner?.lastName
      ? [owner?.firstName, owner?.lastName].filter(Boolean).join(" ")
      : "Owner Information";

  // If you ever have a phone, it would be rendered as tel: link, but currently owner has no number in schema.
  // ONLY using firstName, lastName, email (other keys unused/commented).

  return (
    <div className="agent-single d-sm-flex align-items-center bdrb1 mb30 pb25">
      <div className="single-img mb30-sm ">
        <i className="fas fa-user-circle fz60" />
      </div>
      <div className="single-contant ml30 ml0-xs">
        <h6 className="title mb-1">{displayName}</h6>
        <div className="agent-meta mb10 d-md-flex align-items-center">
          {owner?.email && (
            <a
              className="text fz15 pe-2 "
              href={`mailto:${owner.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-envelope pe-1 ps-1" /> {owner.email}
            </a>
          )}

          {owner?.phone && (
            <a className="text fz15 pe-2 " href={`tel:${owner.phone}`}>
              <i className="flaticon-call pe-1 ps-1" />
              {owner.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAgentInfo;
