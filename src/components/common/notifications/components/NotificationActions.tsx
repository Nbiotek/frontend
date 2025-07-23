import { EnumNotificationType, EnumRole } from '@/constants/mangle';
import { TNotificationDatum } from '@/types/notification';
import NotifyBtn from './NotifyBtn';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

const NotificationActions = (key: EnumNotificationType, notification: TNotificationDatum) => {
  const {
    AuthStore: { user }
  } = useStore();
  const router = useRouter();

  const renderViewButton = (route: string) => {
    if (!notification.reference_id) return <></>;

    return (
      <NotifyBtn
        variant="filled"
        onClick={() => {
          router.push(route.replace(':id', notification.reference_id));
        }}
      >
        View
      </NotifyBtn>
    );
  };

  const renderQCViewButton = () => {
    if (!notification.reference_id) return <></>;

    return (
      <NotifyBtn
        variant="filled"
        onClick={() => {
          if (user.role === EnumRole.LAB_CORDINATOR) {
            router.push(
              ROUTES.LAB_COORD_QUALITY_CONTROL_DETAILS.path.replace(
                ':id',
                notification.reference_id
              )
            );
          }

          if (user.role === EnumRole.LAB_TECHNICIAN) {
            router.push(
              ROUTES.LAB_TECH_QUALITY_CONTROL_DETAILS.path.replace(':id', notification.reference_id)
            );
          }
        }}
      >
        View
      </NotifyBtn>
    );
  };

  const renderTodoViewButton = () => {
    if (!notification.reference_id) return <></>;

    return (
      <NotifyBtn
        variant="filled"
        onClick={() => {
          // TODO:
          // Link to the appropriate route.
        }}
      >
        View
      </NotifyBtn>
    );
  };

  const jsxActionElement = () => {
    switch (key) {
      // ===== PATIENT NOTIFICATIONS =====
      // Appointment related
      case EnumNotificationType.APPOINTMENT_CREATED:
      case EnumNotificationType.APPOINTMENT_CONFIRMED:
      case EnumNotificationType.APPOINTMENT_RESCHEDULED:
      case EnumNotificationType.APPOINTMENT_CANCELLED:
      case EnumNotificationType.APPOINTMENT_REMINDER:
        return renderTodoViewButton();

      // Test related
      case EnumNotificationType.TEST_RESULT_READY:
      case EnumNotificationType.TEST_SAMPLE_COLLECTED:
      case EnumNotificationType.TEST_IN_PROGRESS:
      case EnumNotificationType.TEST_COMPLETED:
        return renderTodoViewButton();

      // Payment related
      case EnumNotificationType.PAYMENT_SUCCESSFUL:
      case EnumNotificationType.PAYMENT_FAILED:
      case EnumNotificationType.PAYMENT_PENDING:
      case EnumNotificationType.PAYMENT_REFUNDED:
      case EnumNotificationType.BILLING_REMINDER:
        return renderTodoViewButton();

      // ===== LAB COORDINATOR NOTIFICATIONS =====
      // Test Management
      case EnumNotificationType.NEW_TEST_REQUEST:
      case EnumNotificationType.TEST_REASSIGNED:
        return renderViewButton(ROUTES.LAB_COORD_TEST_DETAILS.path);

      case EnumNotificationType.TEST_QUALITY_CONTROL_PENDING:
      case EnumNotificationType.TEST_QUALITY_CONTROL_FAILED:
      case EnumNotificationType.QC_TEST_PENDING:
      case EnumNotificationType.QC_TEST_COMPLETED:
      case EnumNotificationType.QC_TEST_FAILED:
        return renderQCViewButton();

      // ===== LAB TECHNICIAN NOTIFICATIONS =====
      // Test Assignment
      case EnumNotificationType.TEST_ASSIGNED_TO_TECHNICIAN:
      case EnumNotificationType.TEST_REASSIGNED_TO_TECHNICIAN:
      case EnumNotificationType.URGENT_TEST_ASSIGNED:
        return renderTodoViewButton();

      // Test Processing
      case EnumNotificationType.TEST_COMPLETION_REMINDER:
      case EnumNotificationType.TEST_DEADLINE_APPROACHING:
      case EnumNotificationType.TEST_OVERDUE:
        return renderTodoViewButton();

      // Staff Coordination
      case EnumNotificationType.DOCTOR_AVAILABILITY_CHANGED:
      case EnumNotificationType.STAFF_ABSENCE_NOTIFIED:
        return renderTodoViewButton();

      default:
        return <></>;
    }
  };

  return <>{jsxActionElement()}</>;
};

export default NotificationActions;
