import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'http://154.53.52.212:8000'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testQuery() {
  const { data: trucks } = await supabase.from('camionetas_grijalva').select('*').limit(2)
  const { data: maint } = await supabase.from('Registro_mantenimiento__camionetas_GRIJALVA').select('*').limit(1)
  
  // Custom query via postgres functions doesn't usually work in anon pg_catalog but let's see what happens if we query a non-existent column, supabase usually returns the valid columns in the hint!
  const { error: e3 } = await supabase.from('Registro_mantenimiento__camionetas_GRIJALVA').select('alguna_columna_falsa_123').limit(1)
  
  fs.writeFileSync('output.json', JSON.stringify({ trucks, maint, errorHint: e3 }, null, 2), 'utf8')
}

testQuery()
