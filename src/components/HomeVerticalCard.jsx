import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const CardContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 30px;
  flex-wrap: wrap;
`;

const CardItems = styled.div`
  border: 2px solid #dfdfdf;
  background-color: white;
  border-radius: 9px;
  width: 323px;
  height: 286px;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 200px;
  border-radius: 7px 7px 0 0;
`;

const Title = styled.div`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
`;

function HomeVerticalCard({ activeTab }) {
  const [projects, setProject] = useState([]);

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

  return (
    <CardContainer>
      {projects
        .filter((product) => activeTab === '전체' || activeTab === product.category)
        .map((item) => (
          <CardItems key={item.id}>
            <Image src={item.mainImage} alt={item.title} />
            <Title>{item.title}</Title>{' '}
          </CardItems>
        ))}
    </CardContainer>
  );
}

export default HomeVerticalCard;
