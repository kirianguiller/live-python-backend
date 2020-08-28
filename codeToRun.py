def dichotomieFonction(f,a,b,p):
  """ 
  return the approximation (at 10^-p) of the value 
  for a function f stricly
  monotonous on [a,b]
  """
  while b-a> 10**(-p):
    m = (b+a)/2
    if f(m)> 0:
      b = m
    else:
      a = m
  return round(m,p)

print(1111)

import os
import numpy
