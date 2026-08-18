import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardPage } from '../../pages/DashboardPage';
import { useAuth } from '../../context/AuthContext';


vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

function renderDashboard(role) {
    useAuth.mockReturnValue({
        user: {
            email: 'test@alkira.com',
            name: 'Test User',
            role
        },
        logout: vi.fn(),
    });


    render (
        <MemoryRouter>
            <DashboardPage/>
        </MemoryRouter>
    );
}


describe('DashboardPage', () => {
    it('shows the "Add segment" button for a read-write user', () => {
        renderDashboard('read-write');
        expect(screen.getByText('+ Add segment')).toBeInTheDocument();
    });

    it('hides the "Add segment" button for a read-only user', () => {
        renderDashboard('read-only');
        expect(screen.queryByText('+ Add segment')).not.toBeInTheDocument();
    });

    it('disables the Edit buttons for a read-only user', () => {
        renderDashboard('read-only');
        const editButtons = screen.getAllByText('Edit');
        editButtons.forEach((button) => {
        expect(button).toBeDisabled();
        });
    });

    it('enables the Edit buttons for a read-write user', () => {
        renderDashboard('read-write');
        const editButtons = screen.getAllByText('Edit');
        editButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
        });
    });
})