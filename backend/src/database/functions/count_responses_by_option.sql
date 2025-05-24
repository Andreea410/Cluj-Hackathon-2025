CREATE OR REPLACE FUNCTION count_responses_by_option(question_id UUID)
RETURNS TABLE (option_id UUID, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT ur.option_id, COUNT(*)::BIGINT as count
  FROM user_responses ur
  WHERE ur.question_id = question_id
  GROUP BY ur.option_id;
END;
$$ LANGUAGE plpgsql; 