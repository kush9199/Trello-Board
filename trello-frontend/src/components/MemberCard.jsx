import "./../styles/MemberCard.css";

function MemberCard({ member }) {

    return (

        <div className="member-card">

            <div className="avatar">

                👤

            </div>

            <div>

                <h3>

                    {member.username}

                </h3>

                <span className={member.role}>

                    {member.role}

                </span>

            </div>

        </div>

    );

}

export default MemberCard;