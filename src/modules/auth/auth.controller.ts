import authService from './auth.service';

export const loginUser = async (req, res) => {
  try {
    const authData = req.body;
    const result = await authService.loginUser(authData);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token: result,
      },
    });
  } catch (err) {
    return {
      message: 'Authentication Failed',
      err,
    };
  }
};
