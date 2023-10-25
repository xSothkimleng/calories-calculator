'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { set, useForm } from 'react-hook-form';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 0.5rem;
  padding: 0.8rem;
  border-radius: 15px;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-radius: 25px;
  }
`;

const MatrixTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 4rem;
  color: white;
  text-transform: uppercase;
`;

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [stepData, setStepData] = useState([]);
  const { foodCal, setFoodCal } = useState();

  const onSubmit = data => {
    const matrix = [
      [data.a1, data.a2, data.a3, data.a4],
      [data.b1, data.b2, data.b3, data.b4],
      [data.c1, data.c2, data.c3, data.c4],
    ];

    const rrefData = rref(matrix);
    console.log('rrefData', typeof rrefData);
    setStepData(rrefData);
  };

  const rref = data => {
    let workingData = [];
    // get the size of the rows and columns for looping
    const numRows = data.length; // in this case 3 row
    const numCols = data[0].length; // in this case 4 columns

    // keep track of the current column being processed
    let lead = 0;
    for (let r = 0; r < numRows; r++) {
      console.log('lead', lead);
      console.log(`r = ${r}`);
      console.log(`lead = ${lead}`);
      // console.log(`data = ${JSON.stringify(data)}`);
      // if the number of columns is less than the current column
      if (numCols <= lead) {
        return data;
      }

      // set the row to the current row
      let i = r;
      console.log('i', i);
      console.log('data[i][lead]', data[i][lead]);
      // while the current row and column is 0
      while (data[i][lead] === 0) {
        console.log('while', data[i][lead]);
        // increment the row
        i++;
        if (numRows === i) {
          // check for the last row
          // if the number of rows is equal to the current row
          i = r;
          lead++;
          if (numCols === lead) {
            // if the number of columns is equal to the current column
            return data;
          }
        }
      }

      // swap the rows
      let temp = data[i];
      data[i] = data[r];
      data[r] = temp;
      let val = data[r][lead];

      for (let j = 0; j < numCols; j++) {
        // divide the current row by the value
        let currentLeadRows = data[r][j];
        data[r][j] /= val;
        console.log(`working ${currentLeadRows} / ${val} = ${data[r][j]}`);
        console.log('data', JSON.stringify(data));
        let currentWorking = {
          title: JSON.stringify(`${currentLeadRows} / ${val} = ${data[r][j]}`),
          data: data,
        };
        workingData.push(currentWorking);
        // setWorkingDatas(prev => [...prev, currentWorking]);
        console.log('workingData', workingData);
      }

      for (let j = 0; j < numRows; j++) {
        if (j !== r) {
          val = data[j][lead];
          for (let k = 0; k < numCols; k++) {
            let currentLeadRows = data[j][k];
            data[j][k] -= val * data[r][k];
            console.log(`working ${currentLeadRows} - (${val} * ${data[r][k]}) = ${data[j][k]}`);
            console.log('data', JSON.stringify(data));
            let currentWorking = {
              title: JSON.stringify(`${currentLeadRows} - (${val} * ${data[r][k]}) = ${data[j][k]})`),
              data: data,
            };
            // Pass setWorkingDatas as a prop to the component
            workingData.push(currentWorking);
            // setWorkingDatas(prev => [...prev, currentWorking]);
            console.log('workingData', workingData);
          }
        }
      }
      lead++;
    }

    return data;
  };

  const handleFoodCal = data => {
    // console.log('data', data);
  };

  const StepSolution = () => {
    let x = Math.round((stepData[0][3] * 100) / 100);
    let y = Math.round((stepData[1][3] * 100) / 100);
    let z = Math.round((stepData[2][3] * 100) / 100);

    return (
      <Form style={{ marginTop: '2rem' }}>
        <MatrixTitle>3 x 4 Matrix</MatrixTitle>
        <div>
          <Input type='text' value='Protein' readOnly />
          <Input type='number' placeholder='Carbs' value={stepData[0][0]} readOnly />
          <Input type='number' placeholder='Carbs' value={stepData[0][1]} readOnly />
          <Input type='number' placeholder='Fat' value={stepData[0][2]} readOnly />
          <Input type='text' placeholder='Total' value={`${x} Calories/gram`} readOnly />
        </div>
        <div>
          <Input type='Text' value='Carbohydrate' readOnly />
          <Input type='number' placeholder='protein' value={stepData[1][0]} readOnly />
          <Input type='number' placeholder='Carbs' value={stepData[1][1]} readOnly />
          <Input type='number' placeholder='Fat' value={stepData[1][2]} readOnly />
          <Input type='text' placeholder='Total' value={`${y} Calories/gram`} readOnly />
        </div>
        <div>
          <Input type='Text' value='Fat' readOnly />
          <Input type='number' placeholder='protein' value={stepData[2][0]} readOnly />
          <Input type='number' placeholder='Carbs' value={stepData[2][1]} readOnly />
          <Input type='number' placeholder='Fat' value={stepData[2][2]} readOnly />
          <Input type='text' placeholder='Total' value={`${z} Calories/gram`} readOnly />
        </div>
      </Form>
    );
  };

  return (
    <Main>
      <Title>Food Calories Calculate</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type='number' placeholder='protein' {...register('a1')} />
          <Input type='number' placeholder='Carbs' {...register('a2')} />
          <Input type='number' placeholder='Fat' {...register('a3')} />
          <Input type='number' placeholder='Total Calories' {...register('a4')} />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <SubmitButton type='submit'>Calculate</SubmitButton>
        </div>
      </Form>
    </Main>
  );
}
