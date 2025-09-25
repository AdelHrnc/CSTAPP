import React, { useState } from 'react';
import './index.css';
import { cognitivePoints } from "./points";

export default function App() {
  const [screen, setScreen] = useState('home');
  const [expanded, setExpanded] = useState(null);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState({ ai: false, age: 13 });
  const [showFilters, setShowFilters] = useState(false);

  // === Top-right controls (HOME + FILTER) ===
  const TopRightControls = () => (
  <div style={{
    position: 'fixed',
    top: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-end',
    zIndex: 1000
  }}>
    {/* Home button */}
    <button
      className="home-btn"
      onClick={() => {
        setScreen('home');
        setExpanded(null);
        setDetail(null);
      }}
      style={{ position: 'relative', marginBottom: 8 }}
    >
      Home
    </button>

    {/* Filter button using a separate class to avoid overlapping */}
    <button
      className="filter-btn"
      onClick={() => setShowFilters(prev => !prev)}
    >
      FILTER
    </button>

    {showFilters && (
      <div style={{
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minWidth: '200px',
        marginTop: 8
      }}>
        <FilterControls />
      </div>
    )}
  </div>
);


  // === Filter Controls ===
  const FilterControls = () => (
    <div className="filters-controls" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label>
        <input
          type="checkbox"
          checked={filter.ai}
          onChange={() => setFilter(prev => ({ ...prev, ai: !prev.ai }))}
        />{' '}
        AI-related
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        Age: {filter.age}
        <input
          type="range"
          min="0"
          max="13"
          step="1"
          value={filter.age}
          onChange={(e) => setFilter(prev => ({ ...prev, age: parseInt(e.target.value, 10) }))}
          style={{ flex: 1, transition: 'all 0.3s ease' }}
        />
      </label>
    </div>
  );

  // === Side Tab ===
  const SideTab = ({ current }) => {
    const topics = [
      { id: 'cognitive', label: 'Cognitive', color: 'blue' },
      { id: 'socio', label: 'Socio-Emotional', color: 'purple' },
      { id: 'physical', label: 'Physical', color: 'orange' }
    ];
    const active = topics.find(t => t.id === current) || topics[0];
    return (
      <div className={`side-tab ${active.color}`}>
        {topics.filter(t => t.id !== current).map(t => (
          <button
            key={t.id}
            onClick={() => {
              setScreen(t.id);
              setExpanded(null);
              setDetail(null);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  };

  // === Back Button ===
  const BackBtn = () => (
    <button className="btn blue" style={{ marginTop: 16 }} onClick={() => setDetail(null)}>
      Back
    </button>
  );

  const parseAgeRange = (ageStr) => {
    if (!ageStr) return [0, 100];
    const cleaned = String(ageStr).replace(/\s+/g, '');
    const parts = cleaned.split('-').map(n => parseInt(n, 10)).filter(n => !Number.isNaN(n));
    if (parts.length === 2) return [parts[0], parts[1]];
    if (parts.length === 1) return [parts[0], parts[0]];
    return [0, 100];
  };

  // === Detail Page ===
  if (detail) {
    let filteredPoints = Array.isArray(detail.points) ? detail.points : [];

    if (filter.ai) filteredPoints = filteredPoints.filter(p => Boolean(p.ai));
    if (filter.age < 13) filteredPoints = filteredPoints.filter(p => {
      const [min] = parseAgeRange(p.age);
      return min <= filter.age;
    });

    return (
      <div className={`container ${screen}`}>
        <TopRightControls />

        <h2>{detail.title}</h2>

        <ul className="detail-list" style={{ padding: 0, listStyle: 'none' }}>
          {filteredPoints.length > 0 ? filteredPoints.map((p, i) => (
            <li
              key={i}
              className="detail-item"
              style={{
                marginBottom: 10,
                opacity: 1,
                transition: 'opacity 0.3s, transform 0.3s'
              }}
            >
              <div className="point-text">{p.text}</div>
              <div className="meta" style={{ fontSize: 12, opacity: 0.8 }}>
                Age: {p.age ?? 'n/a'} {p.ai && <span style={{ marginLeft: 8, fontWeight: 600 }}>(AI)</span>}
              </div>
            </li>
          )) : (
            <p className="no-results">No points match the selected filters.</p>
          )}
        </ul>

        <BackBtn />
        <SideTab current={screen} />
      </div>
    );
  }

  // === HOME ===
  if (screen === 'home') {
    return (
      <div className="container">
        <TopRightControls />
        <h1 className="title">CSTDRC Framework</h1>
        <p className="subtitle">Creative Support Technology Design Recommendations for Children</p>
        <div className="button-row">
          <button className="btn large blue" onClick={() => setScreen('cognitive')}>Cognitive</button>
          <button className="btn large purple" onClick={() => setScreen('socio')}>Socio-Emotional</button>
          <button className="btn large orange" onClick={() => setScreen('physical')}>Physical</button>
        </div>
        <SideTab current="home" />
      </div>
    );
  }

  // === Cognitive Screen ===
  if (screen === 'cognitive') {
    return (
      <div className={`container cognitive`}>
        <TopRightControls />
        <h2>Cognitive</h2>
        <div className="card-row vertical-tree">

          {/* Structure branch */}
          <div className="tree-branch">
            <button
              className="card blue"
              onClick={() => setExpanded(expanded === 'structure' ? null : 'structure')}
            >
              <h3>Structure and Executing Ideas</h3>
            </button>
            <div className={`tree-children ${expanded === 'structure' ? 'open' : ''}`}>
              <button
                className="sub-btn blue"
                onClick={() => setDetail(cognitivePoints.structure.scaffolding)}
              >
                {cognitivePoints.structure.scaffolding.title}
              </button>
              <button
                className="sub-btn blue"
                onClick={() => setDetail(cognitivePoints.structure.workflow)}
              >
                {cognitivePoints.structure.workflow.title}
              </button>
              <button
                className="sub-btn blue"
                onClick={() => setDetail(cognitivePoints.structure.tutorial)}
              >
                {cognitivePoints.structure.tutorial.title}
              </button>
            </div>
          </div>

          {/* Idea branch */}
          <div className="tree-branch">
            <button
              className="card blue"
              onClick={() => setExpanded(expanded === 'idea' ? null : 'idea')}
            >
              <h3>Enabling Idea Generation</h3>
            </button>
            <div className={`tree-children ${expanded === 'idea' ? 'open' : ''}`}>
              <button
                className="sub-btn blue"
                onClick={() => setDetail(cognitivePoints.idea.ideation)}
              >
                {cognitivePoints.idea.ideation.title}
              </button>
              <button
                className="sub-btn blue"
                onClick={() => setDetail(cognitivePoints.idea.questioning)}
              >
                {cognitivePoints.idea.questioning.title}
              </button>
            </div>
          </div>
        </div>

        <SideTab current="cognitive" />
      </div>
    );
  }

  // Placeholder for other topics
  if (screen === 'socio' || screen === 'physical') {
    return (
      <div className={`container ${screen}`}>
        <TopRightControls />
        <h2>{screen === 'socio' ? 'Socio-Emotional' : 'Physical'}</h2>
        <p>Content for this topic hasn't been added yet.</p>
        <SideTab current={screen} />
      </div>
    );
  }

  return null;
}
