const { DashboardServices } = require('../../services/dashboard');

const dashboardController = {
    getDashboard: async (req, res, next) => {
        try {
            const result = await DashboardServices.GetDashboardInfo();

            if (result.status) {
                return res.status(result.code).json({ dashboard: result.body });
            }
            return res.status(result.code).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = dashboardController;
