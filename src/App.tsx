import { useState, useMemo } from 'react'
import './App.css'
import app from './lib/app';
import RenderQuery from './RenderQuery';

function groupByDate(json: Array<any>) {
  let newJson = {} as Record<string, any>;

  for (const value of json) {
    const date = value[Enum.date];
    if (!date) continue
    // console.log(new Date(date))
    if (Array.isArray(newJson[date])) {
      newJson[date].push(value)
    } else {
      newJson[date] = [value];
    }
  }
  return newJson
}

function App() {

  const response = app.queries.useWorklogSheet();

  const data = useMemo(() => groupByDate(response.data ?? []), [response.data])

  return (
    <>
      Google Sheet: Worklog

      <RenderQuery result={response}>

        <CardCss />
        <div className="cards">
          {Object.entries(data).map(([date, item]) =>
            <Card
              key={date}
              item={item}
              title={new Date(date).toDateString()}
            />
          )}
        </div>

      </RenderQuery>

    </>
  )
}

function CardCss() {
  const css = ``
  return <style>
    {css}
  </style>
}

const Enum = {
  date: 'Date',
  employeeCode: 'E Code',
  endTime: 'End Time',
  hours: 'Hours',
  issueId: 'Issue Id',
  issueType: 'Issue Type',
  issueSummary: 'Issue summary',

  name: 'Name',
  projectName: 'Project Name',

  startTime: 'Start time',
  workDescription: 'Work Description',
  srNo: 'Sr.',
}

interface CardProps {
  item: Array<any>;
  title: string;
}

function Card({ item, title }: CardProps) {
  const [showResult, setResult] = useState(false);
  let result: React.ReactNode = title

  if (showResult) {
    result = (
      <div className="scroll all-entry">
        {item.map((entry, index) => {
          return (
            <div key={index} className="entry">
              {`$: ${entry[Enum.workDescription]}`}
            </div>
          )
        })}
      </div>
    )

  } else {
    result = title;
  }

  const onToggleContent = () => {
    setResult(!showResult)
  }

  return <div tabIndex={0} className="card" onClick={onToggleContent}>
    {result}
    <div className="total-count">
      {item.length}
    </div>
  </div>
}

export default App
