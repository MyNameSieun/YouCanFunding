import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

const CardContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 50px;
`;

const CardItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border: 2px solid #dfdfdf;
  border-radius: 9px;
  width: 270px;
  height: 270px;
  background-color: #ffffff84;
  cursor: pointer;

  &:hover {
    box-shadow: 5px 5px 5px lightgray;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;

function HomeVerticalCard({ activeTab, activeNavTab }) {
  const [projects, setProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      const projectQuery = query(collection(db, 'projects'));
      const querySnapshot = await getDocs(projectQuery);

      const projectList = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setProject(projectList);
    };

    getProjects();
  }, []);

  const currentDate = new Date();

  return (
    <CardContainer>
      {/* activeNavTab에 따라 날짜 비교 로직 */}
      {projects
        .filter((product) => activeTab === '전체' || activeTab === product.category)

        .filter((item) => {
          if (activeNavTab === 'inProgress') {
            return currentDate >= new Date(item.startDate) && currentDate <= new Date(item.endDate);
          }
          if (activeNavTab === 'scheduled') {
            return currentDate < new Date(item.startDate);
          }
          if (activeNavTab === 'completed') {
            return currentDate > new Date(item.endDate);
          }
        })
        .map((item) => (
          <CardItems key={item.id} onClick={() => navigate(`/post/${item.id}`)}>
            <Image src={item.mainImage} alt={item.title} />
            <Title>{item.title}</Title>
          </CardItems>
        ))}
    </CardContainer>
  );
}

export default HomeVerticalCard;
