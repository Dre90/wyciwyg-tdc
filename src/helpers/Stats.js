/**
 * @file
 * Helper functions for Stats.
 */

import { supabase } from "@/supabase";

export const sendStats = async (key, value, challenge_id, name) => {
  const item = {
    challenge_id: challenge_id,
    key: key,
    value: value,
    user_id: `${challenge_id}-${name}`,
    name: name,
  };

  const { data, error } = await supabase
      .from('Stats')
      .upsert(item, {
        onConflict: 'user_id'
      });
};

export const getChallengeStats = async (challenge_id) => {
  const { data, error } = await supabase
    .from('Stats')
    .select()
    .eq('challenge_id', challenge_id);

  return data;
};

export const assignNamePosition = (panelData, centerData, occupiedCells) => {
  const padding = 50;

  const vw = panelData.width - (padding * 2);
  const vh = panelData.height - (padding * 2);

  const cols = 5;
  const rows = 5;

  const cellWidth = vw / cols;
  const cellHeight = vh / rows;

  const overLapsWithTitle = (pos, titlePos) => {
    const x = pos.x * cellWidth + padding;
    const y = pos.y * cellHeight + padding;
  
    if (x < titlePos.x + titlePos.width &&
      x + cellWidth > titlePos.x &&
      y < titlePos.y + titlePos.height &&
      cellHeight + y > titlePos.y) {
  
      return true;
    }
    return false; 
  };
  const getEmptyCell = () => {
    const x = getRandomInt(0, cols);
    const y = getRandomInt(0, rows);
    if (occupiedCells.includes(`${x}-${y}`) || overLapsWithTitle({x, y}, centerData)) {
      return getEmptyCell();
    }

    return {
      x: (x * cellWidth) + padding,
      y: (y * cellHeight) + padding,
      width: cellWidth,
      height: cellHeight,
    };
  }

  return getEmptyCell();
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
